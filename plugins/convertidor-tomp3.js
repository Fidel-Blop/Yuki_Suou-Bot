// 🎛️ FNaF LATAM SYSTEM - CONVERTIDOR MP3
// 📂 toMP3 Terminal Module - by @Fidel-Blop

import { toAudio } from '../lib/converter.js'

const handler = async (m, { conn }) => {
  const q = m.quoted ? m.quoted : m
  const mime = (q || q.msg).mimetype || q.mediaType || ''

  if (!/video|audio/.test(mime)) {
    return conn.reply(m.chat, `🎤 *SISTEMA DE AUDIO LATAM:*\n📌 Por favor, responde a un *video* o *nota de voz* para convertirlo a *Audio MP3*.`, m)
  }

  await m.react('🎚️') // Activando módulo de conversión...

  try {
    const media = await q.download()
    if (!media) {
      throw new Error('No se pudo descargar el archivo.')
    }

    const audio = await toAudio(media, 'mp4')
    if (!audio.data) {
      throw new Error('Conversión fallida.')
    }

    await conn.sendMessage(m.chat, {
      audio: audio.data,
      mimetype: 'audio/mpeg'
    }, { quoted: m })

    await m.react('✅') // Conversión completada
    await conn.reply(m.chat, `🎧 *CONVERSIÓN EXITOSA*\n🔊 Archivo listo para escuchar en modo MP3.`, m)
  } catch (e) {
    console.error(e)
    await m.react('⚠️')
    conn.reply(m.chat, `🚨 *ERROR EN EL SISTEMA:*\n${e.message}`, m)
  }
}

handler.help = ['tomp3', 'toaudio']
handler.tags = ['convertidor']
handler.command = ['tomp3', 'toaudio']
handler.group = true
handler.register = true

export default handler
