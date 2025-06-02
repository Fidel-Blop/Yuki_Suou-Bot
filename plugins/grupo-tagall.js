/* 
  ⛓️ Sistema Central FNaF LATAM – TagAll ⛓️
  Versión optimizada por ChatGPT
*/

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return; // Evita el prefijo 'a' o 'A'

  const emoji = global.db.data.chats[m.chat]?.customEmoji || '🧩';
  m.react(emoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const mensaje = args.join` `;
  const encabezado = mensaje ? `📢 *Comunicado:* ${mensaje}` : '📢 *Mención General Activada.*';

  let texto = `🛡️ *PROTOCOLO DE ALERTA - FNaF LATAM*\n\n👥 Usuarios etiquetados: *${participants.length}*\n${encabezado}\n\n┏━━━━⬣\n`;

  for (const user of participants) {
    texto += `┃ ${emoji} @${user.id.split('@')[0]}\n`;
  }

  texto += `┗━━━━⬣\n🧠 Sistema: *${botname}*\n🔄 Versión: *${vs}*`;

  conn.sendMessage(m.chat, {
    text: texto,
    mentions: participants.map(p => p.id)
  });
};

handler.help = ['todos <mensaje>'];
handler.tags = ['grupo'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;
