let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  if (!user) return;

  let moneda = '💰 monedas'; // Definimos moneda para que quede claro

  // Recursos que puede obtener el minero
  let coin = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300]);
  let emerald = pickRandom([1, 5, 7, 8]);
  let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
  let gold = pickRandom([20, 5, 7, 8, 88, 40, 50]);
  let coal = pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64]);
  let stone = pickRandom([200, 500, 700, 800, 900, 4000, 300]);

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557957843.jpeg';

  let time = user.lastmiming + 600000;

  if (new Date() - user.lastmiming < 600000) {
    return conn.reply(m.chat, `⏳ *Paciencia, minero.* Ya trabajaste demasiado. Espera *${msToTime(time - new Date())}* para excavar de nuevo.`, m);
  }

  let expGain = Math.floor(Math.random() * 1000);

  // Narrativa oscura + emojis para la experiencia
  let info = `⛏️ *¡Alerta de Minería!*\n\n` +
             `🌑 Te adentras en la oscuridad de las profundidades...\n\n` +
             `🔥 *Recursos obtenidos:* 🍬\n\n` +
             `⚡ *Experiencia ganada:* ${expGain} XP\n` +
             `${moneda}: *${coin}*\n` +
             `💎 *Esmeraldas*: ${emerald}\n` +
             `⛓️ *Hierro*: ${iron}\n` +
             `🏅 *Oro*: ${gold}\n` +
             `🕯️ *Carbón*: ${coal}\n` +
             `🪨 *Piedra*: ${stone}\n\n` +
             `❗ *Advertencia:* Tu salud disminuyó 50 puntos y tu pico perdió 30 de durabilidad.\n` +
             `⚠️ ¡No olvides cuidarte o podrías no salir de las minas!`;

  await conn.sendFile(m.chat, img, 'mineria_fnaf.jpg', info, fkontak);
  await m.react('⛏️');

  // Actualizamos stats del usuario
  user.health -= 50;
  user.pickaxedurability -= 30;
  user.coin += coin;
  user.iron += iron;
  user.gold += gold;
  user.emerald += emerald;
  user.coal += coal;
  user.stone += stone;
  user.lastmiming = new Date() * 1;

  global.db.write();
}

handler.help = ['minar'];
handler.tags = ['economy'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;
handler.group = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return `${minutes}m y ${seconds}s`;
}
