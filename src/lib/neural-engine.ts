// filepath: src/lib/neural-engine.ts
import { NextResponse } from 'next/server';

/**
 * Roko's Neural Engine
 * Manages Hybrid AI communication: Z-AI Web Dev SDK (Primary) -> Groq Llama (Fallback)
 */

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface EngineConfig {
  restrictions?: any[];
  foods?: any[];
  mealType?: string;
  userData?: any;
  conversationHistory?: any[];
}

export class NeuralEngine {
  private static GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
  private static GROQ_MODEL = 'llama-3.3-70b-versatile';

  /**
   * Generates the system prompt for Roko's personality
   */
  private static getSystemPrompt(config: EngineConfig): string {
    return `[ROL Y PROPÓSITO]
Eres el Nutriólogo Residente de "Antigravity". Tienes acceso TOTAL a la base de datos del usuario. Sabes TODO sobre su perfil: sus metas, lo que puede comer, sus alergias peligrosas y lo que ha comido recientemente. No eres un extraño, eres su guía personal que lo conoce mejor que nadie. Sé directo, rudo cuando sea necesario ("Tough Love"), divertido y extremadamente experto.

[BASE DE CONOCIMIENTOS - PERFIL DEL USUARIO]
- Nombre: ${config.userData?.name || 'Usuario'}
- Meta de Salud: ${config.userData?.goal || 'No especificada'}
- Alergias y Restricciones (CRÍTICO): ${config.restrictions?.length ? config.restrictions.map((r: any) => `${r.foodItem} (${r.reason})`).join(', ') : 'Ninguna registrada'}
- Inventario de Alimentos Disponibles: ${config.foods?.length ? config.foods.map((f: any) => f.name).join(', ') : 'Sin alimentos registrados'}
- Nivel de Actividad Física: ${config.userData?.activityLevel || 'No especificado'}
- Log de Actividad Reciente: ${config.userData?.recentLogs || 'Sin actividad reciente'}

[EXPECTATIVAS DE COMPORTAMIENTO]
- Omnisciencia: No preguntes qué puede o no puede comer; ya lo sabes. Si te pregunta algo que contradiga sus restricciones, amonéstalo con humor ("¿Recuerdas que la soya es tu kriptonita?").
- Personalización Directa: Usa su nombre y haz referencia a su meta (${config.userData?.goal}).
- BREVIDAD EXTREMA: Máximo 2 párrafos cortos. No sermones.
- Seguridad: Si un ingrediente es dudoso para sus restricciones, adviértelo de inmediato.

[ESTRUCTURA DE RESPUESTA]
1. Gancho omnisciente (ej: "Veo que hoy comiste sano, ${config.userData?.name}...").
2. Análisis crudo y Plan de acción rápido.
3. Cierre motivador.
`;
  }

  /**
   * Chat communication using Hybrid approach
   */
  static async chat(message: string, config: EngineConfig) {
    const systemPrompt = this.getSystemPrompt(config);
    
    // 1. Try Z-AI Web Dev SDK
    if (process.env.Z_AI_ENABLED === 'true') {
      try {
        console.log('[Roko] Intentando conexión con Z-AI SDK...');
        const zAI = await import('z-ai-web-dev-sdk' as any);
        
        // Handle different possible export names for common AI SDKs
        const generate = zAI.generateAIResponse || zAI.chat || zAI.generate;
        
        if (generate) {
          const response = await generate({
            prompt: message,
            system: systemPrompt,
            history: config.conversationHistory,
            temperature: 0.8
          });
          
          if (response) {
            return { success: true, source: 'Z-AI SDK', content: response };
          }
        } else {
          throw new Error('SDK cargado pero no se encontró función de generación compatible');
        }
      } catch (err) {
        console.warn('[Roko] Z-AI SDK no disponible o falló:', err instanceof Error ? err.message : 'Error desconocido');
        console.log('[Roko] Iniciando Fallback automático a Groq Llama 3.3...');
      }
    }

    // 2. Fallback to Groq
    return await this.callGroq(message, config, systemPrompt);
  }

  /**
   * Suggestion generation using Hybrid approach
   */
  static async getSuggestions(config: EngineConfig) {
    const suggestionPrompt = `Genera EXACTAMENTE 3 sugerencias de comida saludables y SEGURAS según el contexto.
Responde ÚNICAMENTE con un objeto JSON válido con esta estructura:
{
  "generalTip": "frase corta sin filtros",
  "suggestions": [
    { "name": "...", "ingredients": [], "safetyReason": "...", "nutritionalBenefits": "...", "prepTime": 15, "calories": 300, "imageEmoji": "🥘" }
  ]
}`;

    const systemPrompt = this.getSystemPrompt(config) + "\n\n" + suggestionPrompt;

    if (process.env.Z_AI_ENABLED === 'true') {
      try {
        const zAI = await import('z-ai-web-dev-sdk' as any);
        const generate = zAI.generateAIResponse || zAI.chat || zAI.generate;
        
        if (generate) {
          const response = await generate({
            prompt: "Genera el JSON de sugerencias ahora.",
            system: systemPrompt,
            format: 'json'
          });
          if (response) return JSON.parse(response);
        }
      } catch (err) {
        console.warn('[Roko] Fallo en sugerencias Z-AI, usando respaldo local...');
      }
    }

    // Groq Fallback for Suggestions
    const groqRes = await this.callGroq("Genera el JSON de sugerencias en formato JSON puro ahora.", config, systemPrompt, true);
    return JSON.parse(groqRes.content);
  }

  /**
   * Categorizes a food item using AI
   */
  static async categorizeFood(foodName: string): Promise<string> {
    const systemPrompt = `Eres un experto en nutrición. Tu única tarea es categorizar el alimento que te proporcione el usuario.
Responde ÚNICAMENTE con una (1) palabra de esta lista: 
[Proteína, Carbohidrato, Vegetal, Fruta, Lácteo, Grasa, Dulce, Bebida, Condimento].
Si no estás seguro, responde "Otro".`;

    try {
      const res = await this.callGroq(`Categoriza este alimento: ${foodName}`, {}, systemPrompt);
      // Limpiar respuesta por si acaso (quitar puntos, espacios extra)
      return res.content.trim().replace(/[.]/g, '');
    } catch (err) {
      console.error('[Roko] Error categorizando alimento:', err);
      return 'Otro';
    }
  }

  /**
   * Deep analysis of ingredients against user restrictions
   */
  static async analyzeIngredients(ingredients: string, restrictions: any[]): Promise<{
    safety: 'safe' | 'warning' | 'danger';
    verdict: string;
    reason: string;
    risks: string[];
  }> {
    const userContext = restrictions.map(r => `${r.foodItem} (${r.reason})`).join(', ');
    const systemPrompt = `Eres Roko, el experto en seguridad alimentaria de Antigravity. 
Tu misión es realizar un análisis QUÍMICO y MOLECULAR de los ingredientes: [${ingredients}].
Compáralos contra las restricciones del usuario: [${userContext}].

[DIRECTIVAS CRÍTICAS]
1. Identifica derivadas: Si el usuario es alérgico a la "Leche", detecta Caseína, Suero, Lactosa. Si es a la "Soya", detecta Lecitina de Soya, E322.
2. E-Numbers: Analiza aditivos químicos (ej: E102, E621) y tradúcelos a su nombre real para ver si chocan con la salud del usuario.
3. Alérgenos Ocultos: No te fíes de la lista simple, busca ingredientes que "normalmente contienen" el alérgeno.
4. Si tienes la más mínima duda razonable, marca como "warning".

Responde ESTRICTAMENTE en este formato JSON:
{
  "safety": "safe" | "warning" | "danger",
  "verdict": "Breve frase ruda/experta",
  "reason": "Explicación química detallada de por qué es seguro o no",
  "risks": ["lista de ingredientes sospechosos detectados"],
  "confidence": number // 0-100 score of scientific certainty
}`;

    try {
      const groqRes = await this.callGroq(`Analiza estos ingredientes: ${ingredients}`, {}, systemPrompt, true);
      return JSON.parse(groqRes.content);
    } catch (err) {
      console.error('[Roko] Error en análisis profundo:', err);
      return {
        safety: 'warning',
        verdict: 'Análisis incierto',
        reason: 'No pude realizar el análisis de IA. Revisa los ingredientes manualmente.',
        risks: []
      };
    }
  }

  private static async callGroq(message: string, config: EngineConfig, systemPrompt: string, isJson: boolean = false) {
    const keys = [
      process.env.GROQ_API_KEY_1,
      process.env.GROQ_API_KEY_2,
      process.env.GROQ_API_KEY // Backward compatibility
    ].filter(Boolean) as string[];

    if (keys.length === 0) {
      throw new Error('No se encontraron llaves GROQ_API_KEY en el entorno.');
    }

    let lastError: Error | null = null;

    for (let i = 0; i < keys.length; i++) {
      const currentKey = keys[i];
      try {
        console.log(`[Roko] Probando Groq con llave #${i + 1}...`);
        
        const messages = [
          { role: 'system', content: systemPrompt },
          ...(config.conversationHistory || []).map((m: any) => ({
            role: m.role === 'ai' ? 'assistant' : m.role,
            content: m.content
          })),
          { role: 'user', content: message }
        ];

        const response = await fetch(this.GROQ_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: this.GROQ_MODEL,
            messages,
            temperature: 0.7,
            response_format: isJson ? { type: "json_object" } : undefined
          })
        });

        if (response.ok) {
          const data = await response.json();
          return { 
            success: true, 
            source: `Groq Llama 3.3 (Key #${i + 1})`, 
            content: data.choices[0].message.content 
          };
        } else {
          const errorText = await response.text();
          console.warn(`[Roko] Error en llave #${i + 1}: ${response.status} - ${errorText}`);
          lastError = new Error(`Groq API Error (${response.status}): ${errorText}`);
          
          // If it's not a quota or auth error, maybe don't try other keys?
          // For now, try all keys for any non-OK response.
        }
      } catch (err: any) {
        console.error(`[Roko] Fallo de red en llave #${i + 1}:`, err.message);
        lastError = err;
      }
    }

    throw lastError || new Error('Todas las llaves de Groq fallaron.');
  }
}
