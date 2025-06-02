        // ★ FNaF LATAM Spotify Downloader ★

import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return conn.reply(m.chat, '🔊 *ERROR 1987*\n\n❖ Por favor, dime el nombre de una canción o artista para buscar en Spotify.', m)
  }

  try {
    let resultado = await spotifyxv(text)
    if (!resultado.length) throw '📡 No encontré esa canción en Spotify... ¿Estás seguro de que existe?'

    let cancion = resultado[0]
    let enlaceDescarga = await fetch(`https://archive-ui.tanakadomp.biz.id/download/spotify?url=${cancion.url}`)

    if (!enlaceDescarga.ok) throw `🧨 Error al contactar con el servidor: Código ${enlaceDescarga.status}`

    let json = await enlaceDescarga.json()
    if (!json?.result?.data?.download) throw '💥 No se pudo obtener el enlace de descarga. Vuelve a intentarlo más tarde.'

    let info = `╔══『 SPOTIFY 🎧 FNaF LATAM 』══⬣
║ 🎵 *Título:* ${json.result.data.title}
║ 🧑‍🎤 *Artista:* ${json.result.data.artis}
║ 💿 *Álbum:* ${cancion.album}
║ ⏱ *Duración:* ${timestamp(json.result.data.durasi)}
║ 🔗 *Link Spotify:* ${cancion.url}
╚════════════════════⬣`

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
          mediaType: 1,
          renderLargerThumbnail: true,
          thumbnailUrl: json.result.data.image,
          sourceUrl: json.result.data.download,
          mediaUrl: json.result.data.download
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: json.result.data.download },
      fileName: `${json.result.data.title}.mp3`,
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m })

  } catch (err) {
    return conn.reply(m.chat, `⚠️ *ERROR DETECTADO:*\n\n${err.message || err}`, m)
  }
}

handler.command = ['spotify', 'splay']
handler.help = ['spotify', 'splay']
handler.tags = ['descargas']
handler.group = true
handler.register = true

export default handler

// 🔧 Función para obtener canciones de Spotify
async function spotifyxv(query) {
  let token = await getToken()
  let { data } = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
    headers: { Authorization: 'Bearer ' + token }
  })

  const pistas = data.tracks.items.map(track => ({
    name: track.name,
    artista: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    duracion: timestamp(track.duration_ms),
    url: track.external_urls.spotify,
    imagen: track.album.images[0]?.url || ''
  }))

  return pistas
}

// 🔐 Token de acceso a la API de Spotify
async function getToken() {
  const credentials = Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
  const { data } = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${credentials}`
    }
  })
  return data.access_token
}

// ⏱ Conversión de milisegundos a formato mm:ss
function timestamp(ms) {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec < 10 ? '0' + sec : sec}`
}
