const handler = async (m, { conn, participants, groupMetadata, args }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => './src/catalogo.jpg');
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `🛡️ ${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';
  const mensaje = args.join` ` || '⚠️ ¡Atención, personal de seguridad!';
  
  const texto = `
🎮 *CENTRAL DE VIGILANCIA - FNaF LATAM*

🔐 *Administradores activos en esta sala:*
${listAdmin}

📢 *Mensaje para el escuadrón:*
${mensaje}

⚠️ *Nota:* El uso indebido de este comando será motivo de *expulsión* o *baneo* del sistema del bot.

🕹️ *Freddy Fazbear's Security Bot - v1.0*
`.trim();

  await conn.sendFile(m.chat, pp, 'fnaf.jpg', texto, m, false, {
    mentions: [...groupAdmins.map(v => v.id), owner]
  });
};

handler.help = ['admins <mensaje>'];
handler.tags = ['grupo'];
handler.customPrefix = /^(admins|@admins|dmins)$/i;
handler.command = /^(admins|@admins|dmins)$/i;
handler.group = true;

export default handler;
