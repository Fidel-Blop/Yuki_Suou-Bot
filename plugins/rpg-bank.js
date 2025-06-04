import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
  let emoji = '👁️‍🗨️'
  let moneda = 'soulcoins'

  // Detectar a quién consultar
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender

  if (who === conn.user.jid) {
    await m.react('✖️')
    return
  }

  if (!(who in global.db.data.users)) {
    return m.reply(`${emoji} *No hay registros de esa alma en mi base de datos...*`)
  }

  let user = global.db.data.users[who]
  let nombre = conn.getName(who)
  let coin = user.coin || 0
  let bank = user.bank || 0
  let total = coin + bank

  // Mensaje de balance estilo FNaF
  const texto = `
╭───〔 💼 *EXPEDIENTE FINANCIERO* 〕───⬣
│
│ ✦ 𝑈𝑠𝑢𝑎𝑟𝑖𝑜 : *${nombre}*
│ ✦ 💰 Bolsillo : *${coin} ${moneda}*
│ ✦ 🏦 Banco : *${bank} ${moneda}*
│ ✦ 📊 Total : *${total} ${moneda}*
│
╰───────────────⬣

${emoji} *Consejo del buen Fideos:*  
Protege tus ganancias.  
Usa *${usedPrefix}deposit* para mantenerlas a salvo... o alguien podría *tomarlas* en la oscuridad.`

  await conn.reply(m.chat, texto.trim(), m)
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank']
handler.register = true
handler.group = true

export default handler
