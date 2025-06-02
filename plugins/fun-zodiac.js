let handler = async (m, { conn, usedPrefix, command, text }) => {
  const emojiDark = '🕯️';
  const emojiSkull = '💀';
  const emojiMoon = '🌙';
  const emojiGhost = '👻';

  if (!text) 
    return conn.reply(m.chat, `${emojiSkull} Debes ingresar tu fecha de nacimiento con este formato tenebroso:\n> Ejemplo: ${usedPrefix + command} 2007 06 01`, m);

  let date = null;
  try {
    date = new Date(text);
    if (date.toString() === 'Invalid Date') throw new Error('Fecha inválida');
  } catch {
    return conn.reply(m.chat, `${emojiGhost} ¡La fecha que me diste parece maldita! Prueba con este formato: AAAA MM DD\nEjemplo: 2003 02 07`, m);
  }

  const ahora = new Date();
  const [añoHoy, mesHoy, diaHoy] = [ahora.getFullYear(), ahora.getMonth() + 1, ahora.getDate()];
  const [añoNac, mesNac, diaNac] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

  // Obtener signo zodiacal
  const zodiac = getZodiac(mesNac, diaNac);

  // Calcular edad
  const edadMs = ahora - date;
  const edad = new Date(edadMs).getFullYear() - 1970;

  // Próximo cumpleaños (ajustado si ya pasó este año)
  const proxCumple = [añoHoy + (mesNac < mesHoy || (mesNac === mesHoy && diaNac < diaHoy) ? 1 : 0), mesNac, diaNac];

  // ¿Hoy es cumpleaños? Mensaje especial
  const cumpleHoy = (mesHoy === mesNac && diaHoy === diaNac);
  const edadMsg = cumpleHoy ? `${edad} años - ¡Feliz cumpleaños, alma errante! ${emojiMoon}` : `${edad} años`;

  const mensaje = `
${emojiDark} *🎃 Fecha oscura de nacimiento:* ${añoNac}-${mesNac}-${diaNac}
${emojiSkull} *🔮 Próximo renacer (cumpleaños):* ${proxCumple.join('-')}
${emojiGhost} *🕰️ Edad de tu alma:* ${edadMsg}
${emojiMoon} *♈ Tu signo zodiacal maldito es:* ${zodiac}
  
Que las sombras te guíen siempre...
  `.trim();

  conn.reply(m.chat, mensaje, m);
};

handler.help = ['zodiac *AAAA MM DD*'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true;
handler.command = ['zodia','zodiac'];

export default handler;

const zodiak = [
  ["Capricornio", new Date(1970, 0, 1)],
  ["Acuario", new Date(1970, 0, 20)],
  ["Piscis", new Date(1970, 1, 19)],
  ["Aries", new Date(1970, 2, 21)],
  ["Tauro", new Date(1970, 3, 21)],
  ["Geminis", new Date(1970, 4, 21)],
  ["Cancer", new Date(1970, 5, 22)],
  ["Leo", new Date(1970, 6, 23)],
  ["Virgo", new Date(1970, 7, 23)],
  ["Libra", new Date(1970, 8, 23)],
  ["Scorpion", new Date(1970, 9, 23)],
  ["Sagitario", new Date(1970, 10, 22)],
  ["Capricornio", new Date(1970, 11, 22)]
].reverse();

function getZodiac(month, day) {
  let d = new Date(1970, month - 1, day);
  return zodiak.find(([_, _d]) => d >= _d)[0];
}
