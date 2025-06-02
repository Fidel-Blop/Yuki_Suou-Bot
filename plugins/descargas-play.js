// 🎧 SISTEMA DE DESCARGAS - FNaF LATAM (Pizzaplex Streaming Core)
// ⚙️ Subproceso multimedia activado

import fetch from "node-fetch"
import yts from "yt-search"
import axios from "axios"

const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🎵 *ENTRADA REQUERIDA*\n\nEspecifica el nombre de la música o el enlace de YouTube para continuar.`, m)
    }

    await conn.sendMessage(m.chat, { react: { text: '🎶', key: m.key } })

    let videoIdMatch = text.match(youtubeRegexID)
    let resultsYT = await yts(videoIdMatch === null ? text : 'https://youtu.be/' + videoIdMatch[1])

    if (videoIdMatch) {
      const videoId = videoIdMatch[1]
      resultsYT = resultsYT.all.find(v => v.videoId === videoId) || resultsYT.videos.find(v => v.videoId === videoId)
    }

    let result = resultsYT.all?.[0] || resultsYT.videos?.[0] || resultsYT
    if (!result || result.length === 0) {
      return conn.reply(m.chat, `🛑 *RESULTADO NO ENCONTRADO*\n\nVerifica el nombre o intenta con otro término.`, m)
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = result
    const canal = author?.name || 'Desconocido'
    const vistas = formatViews(views)

    const previewText = `🎼 *CENTRO DE AUDIO - FNaF LATAM*\n\n` +
      `🔊 *Título:* ${title}\n` +
      `📺 *Canal:* ${canal}\n` +
      `👁 *Vistas:* ${vistas}\n` +
      `⏱ *Duración:* ${timestamp}\n` +
      `📅 *Publicado:* ${ago}\n` +
      `🔗 *Enlace:* ${url}`

    const thumb = (await conn.getFile(thumbnail))?.data
    const preview = {
      contextInfo: {
        externalAdReply: {
          title: title,
          body: canal,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true
        }
      }
    }

    await conn.reply(m.chat, previewText, m, preview)

    if (['play', 'yta', 'ytmp3', 'playaudio'].includes(command)) {
      try {
        const api = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
        const audioURL = api.result.download.url

        if (!audioURL) throw new Error('🎧 No se generó el enlace correctamente.')

        await conn.sendMessage(m.chat, {
          audio: { url: audioURL },
          fileName: `${api.result.title}.mp3`,
          mimetype: 'audio/mpeg'
        }, { quoted: m })

      } catch (e) {
        return conn.reply(m.chat, `⚠️ *ERROR DE DESCARGA DE AUDIO*\n\nPosiblemente el archivo es demasiado pesado o hubo un fallo en la generación.`, m)
      }
    }

    else if (['play2', 'ytv', 'ytmp4', 'mp4'].includes(command)) {
      try {
        const res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`)
        const json = await res.json()
        const videoURL = json.result.download.url

        if (!videoURL) throw new Error('🎬 No se generó el enlace correctamente.')

        await conn.sendFile(m.chat, videoURL, json.result.title + '.mp4', title, m)

      } catch (e) {
        return conn.reply(m.chat, `⚠️ *ERROR DE DESCARGA DE VIDEO*\n\nEl archivo puede ser muy pesado o hubo un error en la conversión.`, m)
      }
    }

    else {
      return conn.reply(m.chat, `🚫 *COMANDO NO VÁLIDO*\n\nEl sistema no reconoce esta instrucción.`, m)
    }

  } catch (error) {
    console.error('[FNaF LATAM - ERROR DESCARGA]', error)
    return conn.reply(m.chat, `💥 *FALLO DEL SISTEMA*\n\nSe produjo un error crítico:\n\n> ${error}`, m)
  }
}

handler.command = handler.help = ['play', 'yta', 'ytmp3', 'play2', 'ytv', 'ytmp4', 'mp4', 'playaudio']
handler.tags = ['descargas']
handler.group = true

export default handler

function formatViews(views) {
  if (!views) return "Desconocidas"
  if (views >= 1_000_000_000) return `${(views / 1_000_000_000).toFixed(1)}B`
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
  return views.toString()
}
