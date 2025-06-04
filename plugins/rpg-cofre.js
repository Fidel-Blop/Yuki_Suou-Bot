const handler = async (m, { isPrems, conn }) => {
  const emoji = '🪙', emoji3 = '⏱️', emoji4 = '⚠️';
  const moneda = '💸';

  if (!global.db.data.users[m.sender]) {
    throw `${emoji4} *¡Error 404! Usuario no encontrado... o quizás *"removido"* por las sombras.*`;
  }

  const lastCofreTime = global.db.data.users[m.sender].lastcofre || 0;
  const cooldown = 86400000;
  const now = Date.now();
  const timeToNextCofre = lastCofreTime + cooldown;

  if (now < timeToNextCofre) {
    const tiempoRestante = timeToNextCofre - now;
    const mensajeEspera = `${emoji3} *Ya abriste un cofre hoy... y el eco de ese sonido aún resuena.*\n\n🔒 Regresa en: *${msToTime(tiempoRestante)}*`;
    await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m });
    return;
  }

  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  const recompensaMoneda = Math.floor(Math.random() * 100);
  const recompensaDiamante = Math.floor(Math.random() * 40);
  const recompensaTokens = Math.floor(Math.random() * 10);
  const recompensaExp = Math.floor(Math.random() * 5000);

  global.db.data.users[m.sender].coin += recompensaMoneda;
  global.db.data.users[m.sender].diamonds += recompensaDiamante;
  global.db.data.users[m.sender].joincount += recompensaTokens;
  global.db.data.users[m.sender].exp += recompensaExp;
  global.db.data.users[m.sender].lastcofre = now;

  const texto = `
🎁 *COFRE ABIERTO... ¿O LIBERADO?*
━━━━━━━━━━━━━━━━━━
📦 *Monedas encontradas:* ${recompensaMoneda} ${moneda}
💎 *Fragmentos brillantes:* ${recompensaDiamante}
🎟️ *Tokens malditos:* ${recompensaTokens}
✨ *Energía residual (EXP):* ${recompensaExp}
━━━━━━━━━━━━━━━━━━
🔔 *Consejo:* La próxima vez, asegúrate de que ese cofre no parpadee...
  `.trim();

  await conn.sendMessage(m.chat, { image: { url: img }, caption: texto }, { quoted: m });
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre', 'dailycofre'];
handler.register = true;
handler.group = false;

export default handler;

function msToTime(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}
