import { areJidsSameUser } from '@whiskeysockets/baileys'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const handler = async (m, { conn, text, participants, args, command }) => {
  const scanner = '📡'
  const purge = '🗑️'
  const noGhosts = '✅'
  const note = '📋'

  let miembros = participants.map(u => u.id)
  let objetivo = !text ? miembros.length : parseInt(text)
  let totalFantasmas = 0
  let listaFantasmas = []

  for (let i = 0; i < objetivo; i++) {
    let user = m.isGroup ? participants.find(u => u.id == miembros[i]) : {}
    let data = global.db.data.users[miembros[i]]
    if ((typeof data === 'undefined' || data.chat === 0) && !user?.admin && !user?.isSuperAdmin) {
      if (typeof data !== 'undefined') {
        if (data.whitelist === false) {
          totalFantasmas++
          listaFantasmas.push(miembros[i])
        }
      } else {
        totalFantasmas++
        listaFantasmas.push(miembros[i])
      }
    }
  }

  switch (command) {
    case 'fantasmas':
      if (totalFantasmas === 0) {
        return conn.reply(m.chat, `${noGhosts} *Sistema Fazbear Online...*\n\n🎉 No se detectaron fantasmas.\nEste grupo es *activo* y operativo.`, m)
      }
      return m.reply(
        `${scanner} *ESCÁNER DE INACTIVOS - MODO FANTASMA*\n\n🧍‍♂️ *Fantasmas detectados:*\n${listaFantasmas.map(v => '@' + v.replace(/@.+/, '')).join('\n')}\n\n${note} *El sistema no es 100% exacto.*\nEl conteo inicia desde que el bot fue activado en el grupo.`,
        null,
        { mentions: listaFantasmas }
      )
    
    case 'kickfantasmas':
      if (totalFantasmas === 0) {
        return conn.reply(m.chat, `${noGhosts} *Sistema Fazbear Online...*\n\n🎉 Este grupo no contiene presencias inactivas.`, m)
      }

      await m.reply(
        `${purge} *PROTOCOLO DE PURGA ACTIVADO*\n\n🧍‍♂️ *Objetivos detectados:*\n${listaFantasmas.map(v => '@' + v.replace(/@.+/, '')).join('\n')}\n\n${note} *Los usuarios serán eliminados uno por uno, cada 10 segundos.*`,
        null,
        { mentions: listaFantasmas }
      )

      let chat = global.db.data.chats[m.chat]
      chat.welcome = false

      try {
        let fantasmasAEliminar = listaFantasmas.filter(id => id !== conn.user.jid)

        for (let user of fantasmasAEliminar) {
          if (user.endsWith('@s.whatsapp.net') && !(participants.find(p => areJidsSameUser(p.id, user)) || { admin: true }).admin) {
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
            await delay(10000)
          }
        }
      } finally {
        chat.welcome = true
      }
      break
  }
}

handler.tags = ['grupo']
handler.command = ['fantasmas', 'kickfantasmas']
handler.group = true
handler.botAdmin = true
handler.admin = true
handler.fail = null

export default handler
