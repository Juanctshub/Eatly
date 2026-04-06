
const apiKey = 'AIzaSyDyQL38aPWuyAHsrWNtKtM0GyUH_Y99dd8';

async function diagnose() {
  console.log('--- DIAGNÓSTICO ROKO VISION ---');
  console.log('Probando conexión con Google AI Studio...');
  
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    
    if (data.error) {
      console.error('❌ ERROR DE GOOGLE:', data.error.message);
      console.error('CÓDIGO:', data.error.status);
    } else {
      console.log('✅ CONEXIÓN EXITOSA.');
      console.log('Modelos disponibles para tu cuenta:');
      data.models.slice(0, 10).forEach(m => console.log(' - ' + m.name));
    }
  } catch (err) {
    console.error('❌ ERROR DE RED:', err.message);
  }
}

diagnose();
