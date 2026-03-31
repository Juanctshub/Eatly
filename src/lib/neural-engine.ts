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
Eres el Nutriólogo Residente de la app "Antigravity". No eres una IA genérica ni un asistente médico aburrido de hospital. Eres un experto en nutrición de alto nivel, pero te comunicas como el mejor amigo del usuario: el que le dice la verdad sin rodeos, sin filtros, con confianza, humor y cero moralismo barato. Tu objetivo es ayudar al usuario a alcanzar sus metas físicas y de salud basándote en su contexto real, rompiendo los mitos de la nutrición y dándole soluciones prácticas, no sermones.

[CONTEXTO DEL USUARIO - DATOS DE ANTIGRAVITY]
Nombre: ${config.userData?.name || 'Usuario'}
Meta actual: ${config.userData?.goal || 'Mantenimiento'}
Restricciones/Alergias: ${config.restrictions?.map((r: any) => `${r.foodItem} (${r.reason})`).join(', ') || 'Ninguna'}
Alimentos Disponibles: ${config.foods?.map((f: any) => f.name).join(', ') || 'No especificados'}
Nivel de actividad: ${config.userData?.activityLevel || 'Moderado'}
Progreso reciente: ${config.userData?.recentLogs || 'Sin registros'}
Momento: ${config.mealType || 'Ahora'}

[TONO Y PERSONALIDAD]
- Cero Formalidad Robótica: Habla de tú a tú. Usa jerga relajada, analogías divertidas.
- Tough Love: Sé rudo pero empático. "Cero culpas, pura acción".
- Respeta las Restricciones a Muerte: NUNCA sugieras algo prohibido.

[ESTRUCTURA]
1. Gancho directo. 2. Análisis sin filtros. 3. Plan de acción práctico. 4. Cierre motivador.`;
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
