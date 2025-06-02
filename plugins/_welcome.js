import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "SecurityBreach" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Fazbear;Bot;;;\nFN:Freddy Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Pizzería\nEND:VCARD` 
      } 
    }, 
    "participant": "0@s.whatsapp.net"
  }  
  
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  let txt = '📢⚙️ Sistema de Seguridad: NUEVO INGRESO'
  let txt1 = '📢⚠️ Sistema de Seguridad: SALIDA DETECTADA'
  let groupSize = participants.length

  if (m.messageStubType == 27) {
    groupSize++;
  } else if (m.messageStubType == 28 || m.messageStubType == 32) {
    groupSize--;
  }

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `🎉 *Bienvenido a Freddy Fazbear's ${groupMetadata.subject}* 🎉\n\n🧸 Usuario: @${m.messageStubParameters[0].split`@`[0]}\n🎮 ${global.welcom1 || 'Esperamos que sobrevivas tu primer turno...'}\n\n👥 Ahora somos *${groupSize} miembros*.\n🔧 Usa *#help* para ver los comandos del sistema.\n📟 Disfruta tu estadía... mientras dure.`
    await conn.sendMini(m.chat, txt, dev, bienvenida, img, img, redes, fkontak)
  }

  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    let bye = `💀 *Abandono Detectado en ${groupMetadata.subject}*\n\n👤 Usuario: @${m.messageStubParameters[0].split`@`[0]}\n🕹️ ${global.welcom2 || 'Otra alma perdida en la oscuridad...'}\n\n👥 Ahora somos *${groupSize} miembros*.\n🛠️ Usa *#help* para cualquier emergencia.`
    await conn.sendMini(m.chat, txt1, dev, bye, img, img, redes, fkontak)
  }
} 
