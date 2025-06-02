import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  const emojiDark = '🕷️';
  const emojiSkull = '💀';
  const emojiFire = '🔥';
  const emojiEyes = '👁️‍🗨️';
  const emojiShadow = '🌑';

  if (!text) 
    return conn.reply(m.chat, `${emojiSkull} *¡Eh! Debes escribir algo para crear un Top 10...*`, m);

  const ps = groupMetadata.participants.map(v => v.id);
  if (ps.length < 10) 
    return conn.reply(m.chat, `${emojiShadow} *No hay suficientes participantes para crear un Top 10, inviten más almas a este grupo...*`, m);

  // Elegir 10 participantes distintos (sin repetir)
  let chosen = [];
  while (chosen.length < 10) {
    let candidate = ps[Math.floor(Math.random() * ps.length)];
    if (!chosen.includes(candidate)) chosen.push(candidate);
  }

  // Frases y emojis misteriosos para el título
  let emojisTitle = ['🕸️','👻','☠️','🔮','🖤','🦇','🌘','🩸','⚰️','👁️'];
  let x = emojisTitle[Math.floor(Math.random() * emojisTitle.length)];

  // Sonido creepy random (si quieres, puedes activar luego el audio)
  let k = Math.floor(Math.random() * 70);
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`;

  let topMessage = `*${x} 𝙁𝙉𝘼𝙁 𝙇𝘼𝙏𝘼𝙈 - 𝙏𝙤𝙥 10 𝙙𝙚: "${text}" ${x}*

🎭 *1.* ${user(chosen[0])}
🕷️ *2.* ${user(chosen[1])}
🩸 *3.* ${user(chosen[2])}
⚰️ *4.* ${user(chosen[3])}
👁️ *5.* ${user(chosen[4])}
🦇 *6.* ${user(chosen[5])}
☠️ *7.* ${user(chosen[6])}
🔮 *8.* ${user(chosen[7])}
🖤 *9.* ${user(chosen[8])}
🌘 *10.* ${user(chosen[9])}

💀 Que la oscuridad decida quién reina en este Top... 💀`;

  m.reply(topMessage, null, { mentions: chosen });
}

handler.help = ['top *<texto>*'];
handler.command = ['top'];
handler.tags = ['fun'];
handler.group = true;
handler.register = true;

export default handler;
