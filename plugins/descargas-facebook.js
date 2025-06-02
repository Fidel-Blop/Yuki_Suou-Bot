// 🎥 DESCARGAS FACEBOOK - FNaF LATAM Edition  
// Operador: @Fidel-Blop  
// Sistema de Seguridad Digital del Pizzaplex

import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `⚠️ *ALERTA DE SISTEMA*\n\n🔗 Por favor, ingresa un enlace válido de *Facebook* para continuar con la descarga.`, m)
  }

  let res;
  try {
    await m.react('⏳') // Sistema trabajando
    res = await igdl(args[0])
  } catch (e) {
    console.error('[FNaF LATAM - FB DOWNLOAD ERROR]', e)
    return conn.reply(m.chat, `💀 *ERROR CRÍTICO*\nNo se pudo obtener la información.\n🔎 Verifica que el enlace sea correcto y válido.`, m)
  }

  let result = res.data
  if (!result || result.length === 0) {
    return conn.reply(m.chat, `📡 *SISTEMA DE MONITOREO*\n\n❌ No se encontraron resultados en la búsqueda. Intenta con otro enlace.`, m)
  }

  let data
  try {
    // Priorizar HD, si no, SD
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)")
  } catch (e) {
    console.error('[FNaF LATAM - DATA PROCESS ERROR]', e)
    return conn.reply(m.chat, `⚠️ *ERROR DE SISTEMA*\nHubo un problema procesando los datos recibidos.`, m)
  }

  if (!data) {
    return conn.reply(m.chat, `🚫 *RESOLUCIÓN NO DISPONIBLE*\nNo se encontró una resolución adecuada para descargar.`, m)
  }

  let video = data.url
  try {
    await conn.sendMessage(m.chat, {
      video: { url: video },
      caption: `🎬 *DESCARGA COMPLETA*\n\nAquí tienes tu video de Facebook listo para disfrutar ฅ^•ﻌ•^ฅ.`,
      fileName: 'fb_video.mp4',
      mimetype: 'video/mp4'
    }, { quoted: m })

    await m.react('✅') // Confirmación de éxito
  } catch (e) {
    console.error('[FNaF LATAM - SEND VIDEO ERROR]', e)
    await m.react('❌')
    return conn.reply(m.chat, `💀 *ERROR FATAL*\nNo se pudo enviar el video.\nIntenta nuevamente o reporta el problema.`, m)
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true
handler.register = true
handler.coin = 2

export default handler
