// 🛠️ FNaF LATAM SYSTEM - BUSCADOR YOUTUBE 🔍
// ⛓️ Script personalizado por @Fidel-Blop para el bot oficial

import yts from 'yt-search'

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, '✖️ *ERROR DE PARÁMETRO*\n🔎 Debes ingresar una palabra clave para buscar en YouTube.', m)
  }

  await m.react('🌀') // Iniciando búsqueda…

  try {
    await conn.reply(m.chat, '🔧 *SISTEMA LATAM: ESCANEANDO YOUTUBE...*\n⏳ Espera un momento...', m)

    const res = await yts(text)
    const vids = res.all.filter(v => v.type === 'video')

    if (!vids.length) throw new Error('Sin resultados.')

    const listado = vids.slice(0, 6).map(v => {
      return `🎬 *${v.title}*\n📺 Canal: ${v.author.name}\n⏱️ Duración: ${v.timestamp}\n📆 Fecha: ${v.ago}\n👁️ Vistas: ${v.views.toLocaleString()}\n🔗 Link: ${v.url}`
    }).join('\n\n🧷━━━━━━━━━━━━━🧷\n\n')

    await conn.sendFile(m.chat, vids[0].thumbnail, 'yt-result.jpg',
`🔦 *FNaF LATAM - RESULTADOS DE BÚSQUEDA:*\n🕵️ Término: _${text}_

${listado}

👁️‍🗨️ *Sistema de Monitoreo LATAM Online*`, m)

    await m.react('✅') // Completado
  } catch (err) {
    console.error(err)
    await m.react('⚠️')
    return conn.reply(m.chat, `❌ *ERROR DEL SISTEMA:*\n${err.message}`, m)
  }
}

handler.help = ['ytsearch <texto>']
handler.tags = ['buscador']
handler.command = ['ytbuscar', 'ytsearch', 'yts']
handler.register = true
handler.coin = 1

export default handler
