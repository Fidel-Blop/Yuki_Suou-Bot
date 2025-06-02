let handler = async (m, { conn }) => {
  if (!m.quoted) {
    return conn.reply(m.chat, '🛑 *Error de protocolo:* Debes *citar* el mensaje que deseas eliminar.\n\n🎮 *Sistema de Seguridad - FNaF LATAM*', m);
  }

  try {
    const targetUser = m.message.extendedTextMessage.contextInfo.participant;
    const targetMsgID = m.message.extendedTextMessage.contextInfo.stanzaId;

    return await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: targetMsgID,
        participant: targetUser
      }
    });
  } catch (error) {
    // Intenta borrar como fallback si el método principal falla
    try {
      return await conn.sendMessage(m.chat, {
        delete: m.quoted.vM.key
      });
    } catch (err) {
      return conn.reply(m.chat, '⚠️ *Falló la operación de borrado.*\nEs posible que no tengas permisos suficientes o que el mensaje ya no exista.\n\n🔐 *Sistema de Seguridad - FNaF LATAM*', m);
    }
  }
};

handler.help = ['delete'];
handler.tags = ['grupo'];
handler.command = ['del', 'delete'];
handler.group = false; // Puede usarse también en privado si lo deseas cambiar
handler.admin = true;
handler.botAdmin = true;

export default handler;
