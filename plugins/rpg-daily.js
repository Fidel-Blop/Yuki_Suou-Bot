var handler = async (m, { conn }) => {
  const emoji = '🎁', emoji4 = '⏱️';
  const moneda = '💸';

  let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  let exp = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
  let diamantes = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

  let user = global.db.data.users[m.sender];
  let tiempoActual = Date.now();
  let tiempoEspera = 86400000;
  let tiempoRestante = user.lastclaim + tiempoEspera - tiempoActual;

  if (tiempoRestante > 0) {
    return conn.reply(m.chat, `${emoji4} *Ya reclamaste tu turno nocturno.*\n⏰ Regresa en: *${msToTime(tiempoRestante)}*\n\n🎮 *No bajes la guardia...*`, m);
  }

  user.diamond += diamantes;
  user.coin += coin;
  user.exp += exp;
  user.lastclaim = tiempoActual;

  const mensaje = `
╭━━🎮━〔 Recompensa Diaria 〕━🎮━━⬣
┃${emoji} ¡Has sobrevivido otra noche!
┃🎖️ *Recompensas del turno nocturno:*
┃✨ XP: +${exp}
┃💎 Diamantes: +${diamantes}
┃${moneda} ${moneda}: +${coin}
╰━━━━━━━━━━━━━━━━━━━━⬣
🎤 *"It's me..."* —Susurra la voz desde la sala 4B`;

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['daily', 'claim'];
handler.tags = ['rpg'];
handler.command = ['daily', 'diario'];
handler.group = true;
handler.register = true;

export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours}h ${minutes}m ${seconds}s`;
}
