// 📂 FNaF LATAM SYSTEM - ENLACE GENERADOR DE ARCHIVOS
// 🎮 Subida remota de imagen/video - powered by @Fidel-Blop

import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime) {
    return conn.reply(m.chat, `📸 *FNaF SYSTEM ALERT:*\n⚠️ Por favor, responde a una *imagen* o *video* para generar su enlace directo.`, m)
  }

  await m.react('📡') // Iniciando proceso de enlace...

  try {
    const media = await q.download()
    const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    const link = await (isTele ? uploadImage : uploadFile)(media)
    const img = await (await fetch(`${link}`)).buffer()

    const txt = `
🎯 *SISTEMA DE ENLACES - FNaF LATAM*
━━━━━━━━━━━━━━━━━━━━
📎 *Enlace Directo:* 
${link}

🔗 *Acortado:*
${await shortUrl(link)}

📁 *Tamaño del Archivo:*
${formatBytes(media.length)}

🕓 *Expiración:* 
${isTele ? 'No expira' : 'Desconocido'}

🛠️ *Sistema Operador:*
@Fidel-Blop
━━━━━━━━━━━━━━━━━━━━
`

    await conn.sendFile(m.chat, img, 'enlace.jpg', txt.trim(), m)
    await m.react('✅') // Proceso completado
  } catch (e) {
    console.error(e)
    await m.react('❌')
    conn.reply(m.chat, `🚨 *ERROR FATAL:*\nNo se pudo generar el enlace. Intenta de nuevo.`, m)
  }
}

handler.help = ['tourl']
handler.tags = ['convertidor']
handler.command = ['tourl', 'upload']
handler.register = true

export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
} 
