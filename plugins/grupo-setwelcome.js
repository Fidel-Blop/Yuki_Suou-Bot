let handler = async (m, { conn, text, isAdmin, isROwner, chat }) => {
  const consola = '📡'
  const advertencia = '⚠️'
  const aprobado = '✅'
  const denegado = '❌'

  if (!isAdmin && !isROwner) {
    return m.reply(`${denegado} *ACCESO DENEGADO*\n\nSolo un *admin* puede configurar la bienvenida en este grupo.`)
  }

  if (!text) {
    return m.reply(
      `${advertencia} *SISTEMA CENTRAL – FNaF LATAM*\n\n🚨 No se ha detectado ninguna frase para la entrada.\n\n📂 *Ejemplo correcto:*\n#setwelcome Bienvenido @user, has sido registrado por el sistema.\n\n🎮 Solo *administradores del recinto* pueden modificar este mensaje.`
    )
  }

  // Asegurarse de que existe la estructura del grupo en la base de datos
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}

  global.db.data.chats[m.chat].welcome = text.trim()

  m.reply(
    `${consola} *PROTOCOLO DE BIENVENIDA CONFIGURADO*\n\n${aprobado} El mensaje ha sido cargado con éxito en la cinta de entrada para este grupo:\n\n📝 _${text.trim()}_\n\n🎞️ *Sistema de vigilancia listo para la próxima detección de ingreso.*`
  )
}

handler.help = ['setwelcome']
handler.tags = ['grupo']
handler.command = ['setwelcome']
handler.admin = true
handler.botAdmin = true

export default handler
