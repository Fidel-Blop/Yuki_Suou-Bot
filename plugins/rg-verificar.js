import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  const emoji = '🎮'
  const emoji2 = '⚠️'
  const emoji3 = '📝'
  const emoji4 = '✅'
  const emoji5 = '👤'
  
  let who = m.mentionedJid && m.mentionedJid[0]
    ? m.mentionedJid[0]
    : m.fromMe
    ? conn.user.jid
    : m.sender
  
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered === true) {
    return m.reply(`${emoji4} *¡Ya estás verificado, recluta!* 🎖️\n\n¿Quieres reiniciar tu archivo en la base de datos de Fazbear?\nUsa el comando:\n*${usedPrefix}unreg* 🗑️`)
  }

  if (!Reg.test(text)) {
    return m.reply(`${emoji2} *¡Formato incorrecto!*\n\nUsa el comando así:\n> *${usedPrefix + command} nombre.edad*\n\nEjemplo:\n> *${usedPrefix + command} ${name2}.18*\n\n🎪 ¡No olvides que Freddy lo está observando!`)
  }

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`${emoji2} *Tu nombre no puede estar vacío... Bonnie se enoja.*`)
  if (!age) return m.reply(`${emoji2} *La edad es necesaria para tu pase nocturno.*`)
  if (name.length >= 100) return m.reply(`${emoji2} *El nombre es muy largo. ¿Eres un animatrónico o qué?* 🤖`)
  age = parseInt(age)
  if (age > 100) return m.reply(`${emoji2} *¿Más de 100 años? Golden Freddy aprueba tu sabiduría.* 👴`)
  if (age < 5) return m.reply(`${emoji2} *Demasiado joven para ser guardia nocturno, lo siento.* 👶`)

  user.name = name.trim()
  user.age = age
  user.regTime = +new Date
  user.registered = true

  let verifyText = `
${emoji5} *VERIFICACIÓN COMPLETA*
━━━━━━━━━━━━━━━━━━━━
📛 *Nombre:* ${name}
🎂 *Edad:* ${age} años
🆔 *ID:* ${createHash('md5').update(m.sender).digest('hex')}
━━━━━━━━━━━━━━━━━━━━
${emoji} ¡Bienvenido a la pizzería Freddy Fazbear’s! 🌙
🎪 Prepárate para una aventura nocturna llena de jumpscares y trabajo mal pagado.
`.trim()

  await conn.sendFile(m.chat, pp, 'perfil.jpg', verifyText, m)
}

handler.help = ['verificar']
handler.tags = ['rg']
handler.command = ['verificar', 'register', 'reg', 'registrar']
handler.register = false

export default handler
