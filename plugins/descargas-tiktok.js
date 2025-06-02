// ★ FNaF LATAM TikTok Downloader ★

import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🎥 *ERROR 1983*\n\n❖ Por favor, proporciona el enlace de un video de TikTok para descargar.', m)
  }

  try {
    await conn.reply(m.chat, '⏳ *RECOLECTANDO DATOS...*\n\n❖ No te muevas. Estoy extrayendo el contenido de TikTok... 📡', m)

    const data = await tiktokdl(args[0])

    if (!data || !data.data || !data.data.play) {
      return conn.reply(m.chat, '🚫 *ERROR:*\n\nNo se pudo obtener el video desde TikTok. Asegúrate de que el enlace sea válido.', m)
    }

    const video = data.data.play
    const caption = `🎬 *FNaF LATAM VIDEO DETECTADO* 🎬\n\n📱 *Usuario:* @${data.data.author?.unique_id || 'desconocido'}\n🎶 *Audio:* ${data.data.music_info?.title || 'Desconocido'}\n🕒 *Duración:* ${data.data.duration || 'N/A'} seg`

    await conn.sendFile(m.chat, video, 'fnaf-tiktok.mp4', caption, m)
  } catch (err) {
    return conn.reply(m.chat, `💀 *ERROR FATAL:*\n\n${err.message || err}`, m)
  }
}

handler.help = ['tiktok'].map(v => v + ' <link>')
handler.tags = ['descargas']
handler.command = ['tiktok', 'tt']
handler.group = true
handler.register = true
handler.limit = true
handler.coin = 2

export default handler

// 🧠 Extrae datos del video usando la API de TikWM
async function tiktokdl(url) {
  let api = `https://www.tikwm.com/api/?url=${url}&hd=1`
  let res = await fetch(api)
  let json = await res.json()
  return json
}
