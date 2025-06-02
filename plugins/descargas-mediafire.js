// 📂 DESCARGAS MEDIAFIRE - FNaF LATAM Edition  
// Sistema de Transferencia de Archivos del Pizzaplex  
// Controlador: @Fidel-Blop

import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {

  if (!text) {
    return conn.reply(m.chat, `⚠️ *ALERTA DE ENTRADA VACÍA*\n\n🔗 Necesito que ingreses un enlace de *MediaFire* para comenzar la extracción del archivo.`, m)
  }

  await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } }) // Esperando...

  let res
  try {
    res = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
    const json = await res.json()

    const archivo = json.data[0]
    if (!archivo?.link) {
      throw new Error("Enlace inválido o sin datos.")
    }

    const info = `📥 *ARCHIVO DETECTADO*\n\n` +
                 `📦 *Nombre:* ${archivo.nama}\n` +
                 `🧱 *Tamaño:* ${archivo.size}\n` +
                 `📂 *MimeType:* ${archivo.mime}\n` +
                 `\n🎮 *FNaF LATAM - Sistema de Extracción Digital*`

    await conn.sendFile(m.chat, archivo.link, archivo.nama, info, m)
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } }) // Confirmación
  } catch (err) {
    console.error('[FNaF LATAM - MEDIAFIRE ERROR]', err)
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } })
    return conn.reply(m.chat, `💥 *ERROR DE TRANSFERENCIA*\n\nNo se pudo procesar el enlace.\n🕵️ Verifica que el archivo aún esté disponible o intenta más tarde.`, m)
  }
}

handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command = ['mf', 'mediafire']
handler.coin = 10
handler.register = true
handler.group = true

export default handler
