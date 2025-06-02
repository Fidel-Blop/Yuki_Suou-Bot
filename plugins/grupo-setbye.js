let handler = async (m, { conn, text, isRowner }) => {
  const consola = '📡'
  const emoji = '👋'
  const denegado = '❌'

  if (!text) {
    return m.reply(
      `${denegado} *SISTEMA FNaF LATAM - CONFIGURACIÓN DE DESPEDIDA*\n\n🛑 Debes proporcionar un mensaje de despedida.\n\n📌 *Ejemplo:*\n#setbye Adiós @user, te estaremos vigilando desde las cámaras... 👁️`
    )
  }

  global.welcom2 = text.trim()

  m.reply(
    `${consola} *PROTOCOLO DE SALIDA CONFIGURADO*\n\n${emoji} Nuevo mensaje de despedida cargado exitosamente:\n\n📝 _${global.welcom2}_\n\n📼 La cinta ha sido almacenada en el sistema central.`
  )
}

handler.help = ['setbye']
handler.tags = ['tools']
handler.command = ['setbye']
handler.owner = false
handler.admin = true

export default handler
