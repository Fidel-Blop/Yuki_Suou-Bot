const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const respuestas = [
  '🔮 Sí...',
  '⚠️ Tal vez sí...',
  '📡 Posiblemente.',
  '⛔ Probablemente no...',
  '❌ No.',
  '🚫 Imposible.',
  '🤔 ¿Por qué haces estas preguntas?',
  '💀 Por eso te dejaron...',
  '👁️‍🗨️ ¿Para qué quieres saber eso?',
  '📵 No te lo diré...'
];

let handler = async (m, { conn, text }) => {
  const emoji = '🎮';
  const thinking = '🤖';
  const rwait = '⌛';
  const suspense = '👀';
  const done = '✅';

  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `${emoji} *ERROR:* Debes escribir una pregunta para que los animatrónicos respondan.`, m);
  }

  await m.react(thinking);
  await conn.reply(m.chat, `${suspense} *Los animatrónicos están deliberando...*`, m);
  await delay(1000 * 1.2);
  await m.react('🤖');
  await delay(1000 * 1.3);
  await m.react('🔍');
  await delay(1000 * 1.5);

  let res = respuestas[Math.floor(Math.random() * respuestas.length)];

  const respuestaFinal = `
*╭───⌈ 🤖 RESPUESTA DEL SISTEMA ⌋───╮*

❓ *Pregunta:* ${text}
🎤 *Respuesta:* ${res}

*╰──⌈ FNaF LATAM BOT ⌋──╯*`;

  await conn.reply(m.chat, respuestaFinal.trim(), m);
  await m.react(done);
};

handler.help = ['pregunta'];
handler.tags = ['fun'];
handler.command = ['pregunta','preguntas'];
handler.group = true;
handler.register = true;

export default handler;
