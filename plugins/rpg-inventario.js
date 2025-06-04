import db from '../lib/database.js';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;

  if (!(who in global.db.data.users)) {
    return conn.reply(m.chat, `⚠️ Usuario no encontrado en la base de datos del gremio... ¿Estás seguro que pertenece al oscuro círculo?`, m);
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557972839.jpeg';
  let user = global.db.data.users[who];
  let name = conn.getName(who);

  let premiumStatus = user.premium ? '🟢 Activo' : '🔴 Inactivo';

  let text = `╭━〔 Inventario del Aventurero ${name} 〕\n` +
             `┃ 💰 *Monedas:* ${user.coin || 0} ${moneda}\n` +
             `┃ 🏦 *Banco (tesoro oculto):* ${user.bank || 0} ${moneda}\n` +
             `┃ 💎 *Diamantes brutos:* ${user.diamond || 0}\n` +
             `┃ 🟢 *Esmeraldas místicas:* ${user.emerald || 0}\n` +
             `┃ ⚙️ *Hierro (herramientas forjadas):* ${user.iron || 0}\n` +
             `┃ 🏅 *Oro puro:* ${user.gold || 0}\n` +
             `┃ 🕋 *Carbón (para fuego oscuro):* ${user.coal || 0}\n` +
             `┃ 🪨 *Piedra antigua:* ${user.stone || 0}\n` +
             `┃ 🍬 *Dulces malditos:* ${user.candies || 0}\n` +
             `┃ 🎁 *Regalos misteriosos:* ${user.gifts || 0}\n` +
             `┃ 🎟️ *Tokens del gremio:* ${user.joincount || 0}\n` +
             `┃ ✨ *Experiencia acumulada:* ${user.exp || 0} XP\n` +
             `┃ ❤️ *Salud actual:* ${user.health || 100}\n` +
             `┃ ⚜️ *Estado Premium:* ${premiumStatus}\n` +
             `┃ ⏳ *Última expedición:* ${user.lastAdventure ? moment(user.lastAdventure).fromNow() : 'Nunca se ha aventurado'}\n` +
             `┃ 📅 *Fecha y hora actual:* ${new Date().toLocaleString('es-ES')}\n` +
             `╰━━━━━━━━━━━━⬣\n` +
             `*¡Prepárate para la próxima misión, no hay descanso en el gremio...* ⚔️`;

  await conn.sendFile(m.chat, img, 'inventario.jpg', text, fkontak);
};

handler.help = ['inventario', 'inv'];
handler.tags = ['rpg'];
handler.command = ['inventario', 'inv'];
handler.group = true;
handler.register = true;

export default handler;
