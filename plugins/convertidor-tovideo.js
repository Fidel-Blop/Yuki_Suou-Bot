// 🎥 SISTEMA DE CONVERSIÓN - STICKER A VIDEO
// ⚙️ FNaF LATAM Operador: @Fidel-Blop

import { webp2mp4 } from '../lib/webp2mp4.js'
import { ffmpeg } from '../lib/converter.js'

const handler = async (m, { conn, usedPrefix, command }) => {

  if (!m.quoted) {
    return conn.reply(m.chat, `🎭 *SISTEMA DE VIDEO - FNaF LATAM*\n\n⚠️ Responde a un *sticker* para iniciar la conversión a video.`, m)
  }

  const mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) {
    return conn.reply(m.chat, `🧩 *ERROR DE TIPO*\n🛑 Solo se admiten *stickers (webp)* para este comando.`, m)
  }

  const media = await m.quoted.download()
  let out = Buffer.alloc(0)

  await m.react('🎬') // Procesando...

  try {
    out = await webp2mp4(media)
    await conn.sendFile(m.chat, out, 'video.mp4', `✅ *Conversión completada.*\n🎞️ Aquí tienes tu archivo en *formato video* listo para uso.`, m, 0, {
      thumbnail: out
    })
    await m.react('✅') // Éxito
  } catch (e) {
    console.error('[FNaF LATAM] Error al convertir:', e)
    await m.react('❌')
    conn.reply(m.chat, `💀 *ERROR EN EL SISTEMA:*\nNo se pudo convertir el archivo. Intenta nuevamente o reporta a mantenimiento.`, m)
  }
}

handler.help = ['tovideo']
handler.tags = ['convertidor']
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif']
handler.group = true
handler.register = true

export default handler
