var handler = async (m, { conn, usedPrefix, command, text }) => {
  const consola = '📡'
  const denegado = '❌'
  const aprobado = '✅'
  const alerta = '⚠️'

  let number
  if (isNaN(text) && !text.match(/@/g)) {
    // No válido
  } else if (isNaN(text)) {
    number = text.split`@`[1]
  } else if (!isNaN(text)) {
    number = text
  }

  if (!text && !m.quoted)
    return conn.reply(
      m.chat,
      `${denegado} *SISTEMA DE CONTROL - FNaF LATAM*\n\n🛑 Debes marcar a un usuario con @ o responder a un mensaje para otorgar acceso administrativo.`,
      m
    )

  if (number && (number.length > 13 || number.length < 11))
    return conn.reply(
      m.chat,
      `${alerta} El número no es válido. Verifica que sea un contacto válido del grupo.`,
      m
    )

  let user
  try {
    if (text) {
      user = number + '@s.whatsapp.net'
    } else if (m.quoted.sender) {
      user = m.quoted.sender
    } else if (m.mentionedJid) {
      user = number + '@s.whatsapp.net'
    }
  } catch (e) {
    return conn.reply(m.chat, `${denegado} Error al procesar el usuario.`, m)
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    await conn.reply(
      m.chat,
      `${consola} *SISTEMA FNaF LATAM - CAMBIO DE NIVEL*\n\n👤 Usuario: @${user.split('@')[0]}\n${aprobado} Ha sido promovido como administrador del grupo.\n\n🎖️ _Acceso elevado. Privilegios otorgados._`,
      m,
      { mentions: [user] }
    )
  } catch (err) {
    conn.reply(
      m.chat,
      `${denegado} No se pudo promover al usuario. Verifica que esté en el grupo y que el bot tenga permisos.`,
      m
    )
  }
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'darpija', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
