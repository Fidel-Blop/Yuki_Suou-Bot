let handler = async (m, { conn, args, usedPrefix, command }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null)
  const icono = '🌐'
  const fnafEmoji = '🔧'
  const fnafLock = '🔒'
  const fnafUnlock = '🔓'

  let estadoGrupo = {
    'open': 'not_announcement',
    'close': 'announcement',
    'abrir': 'not_announcement',
    'cerrar': 'announcement',
    'abierto': 'not_announcement',
    'cerrado': 'announcement'
  }[(args[0] || '').toLowerCase()]

  if (!estadoGrupo)
    return conn.reply(m.chat, `🎮 *CONFIGURACIÓN DEL GRUPO - FNaF LATAM*\n\n${fnafEmoji} Elige una opción válida:\n\n✦ *${usedPrefix + command} abrir*\n✦ *${usedPrefix + command} cerrar*\n✦ *${usedPrefix + command} open*\n✦ *${usedPrefix + command} close*`, m)

  await conn.groupSettingUpdate(m.chat, estadoGrupo)

  if (estadoGrupo === 'not_announcement') {
    m.reply(`${fnafUnlock} *Canales de comunicación activados...*\n📢 Los miembros pueden enviar mensajes.\n\n🛠️ _Sistema de grupo reconfigurado por un Técnico de Seguridad Fazbear._`)
  }

  if (estadoGrupo === 'announcement') {
    m.reply(`${fnafLock} *Modo de Seguridad Activado...*\n🛡️ Solo *administradores* pueden escribir.\n\n🎙️ _Silencio protocolar por motivos de mantenimiento en la sala de control._`)
  }
}

handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler
