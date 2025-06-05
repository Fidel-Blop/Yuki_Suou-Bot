let handler = async (m, { conn, text, isAdmin, isROwner, chat }) => {
  const consola = '📡'
  const emoji = '👋'
  const denegado = '❌'

  if (!isAdmin && !isROwner) {
    return m.reply(`${denegado} *ACCESO DENEGADO*\n\nSolo un *admin* puede configurar la despedida en este grupo.`)
  }

  if (!text) {
    return m.reply(
      `${denegado} *SISTEMA FNaF LATAM - CONFIGURACIÓN DE DESPEDIDA*\n\n🛑 Debes proporcionar un mensaje de despedida.\n\n📌 *Ejemplo:*\n#setbye Adiós @user, te estaremos vigilando desde las cámaras... 👁️`
    )
  }

  // Asegurarse de que existe la estructura del grupo en la base de datos
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}

  global.db.data.chats[m.chat].bye = text.trim()

  m.reply(
    `${consola} *PROTOCOLO DE SALIDA CONFIGURADO*\n\n${emoji} Nuevo mensaje de despedida cargado para este grupo:\n\n📝 _${text.trim()}_\n\n📂 Almacenado localmente en el canal de seguridad de *${chat.subject || 'el grupo'}*.`
  )
}

handler.help = ['setbye']
handler.tags = ['tools']
handler.command = ['setbye']
handler.owner = false
handler.admin = true

export default handler
