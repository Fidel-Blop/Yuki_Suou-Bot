var handler = async (m, { conn, participants, usedPrefix, command }) => {
  const expulsa = '🔦'
  const denegado = '❌'
  const seguridad = '🛡️'

  if (!m.mentionedJid[0] && !m.quoted) {
    return conn.reply(
      m.chat,
      `${denegado} *SISTEMA DE CONTROL - PROTOCOLO DE SEGURIDAD*\n\n🔍 Debes marcar a un objetivo. Usa @ o responde a un mensaje para seleccionar al usuario.`,
      m
    )
  }

  let objetivo = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  const infoGrupo = await conn.groupMetadata(m.chat)
  const propietarioGrupo = infoGrupo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
  const propietarioBot = global.owner[0][0] + '@s.whatsapp.net'

  // Verificaciones de seguridad
  if (objetivo === conn.user.jid) {
    return conn.reply(
      m.chat,
      `${seguridad} El sistema no permite que el bot se autoexpulse. Seguridad priorizada.`,
      m
    )
  }

  if (objetivo === propietarioGrupo) {
    return conn.reply(
      m.chat,
      `${seguridad} No puedes expulsar al propietario del recinto. Acceso denegado.`,
      m
    )
  }

  if (objetivo === propietarioBot) {
    return conn.reply(
      m.chat,
      `${seguridad} Ese usuario posee permisos de consola. Expulsión bloqueada.`,
      m
    )
  }

  await conn.reply(
    m.chat,
    `${expulsa} *SISTEMA FNAF LATAM - EXPULSIÓN EJECUTADA*\n\n👤 Objetivo: @${objetivo.split('@')[0]}\n⚠️ Acceso revocado. El usuario fue removido del grupo.`,
    m,
    { mentions: [objetivo] }
  )

  await conn.groupParticipantsUpdate(m.chat, [objetivo], 'remove')
}

handler.help = ['kick']
handler.tags = ['grupo']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.register = true
handler.botAdmin = true

export default handler
