/*
  🎮 Sistema de Juego – Piedra, Papel o Tijera
  🛡️ FNaF LATAM | Versión profesional
*/

const handler = async (m, { conn, text, command, usedPrefix, args }) => {
  const portada = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg';
  const cooldown = 10000; // 10 segundos
  const usuario = global.db.data.users[m.sender];

  const espera = usuario.wait + cooldown;
  const ahora = new Date * 1;

  if (ahora < espera) {
    const restante = Math.floor((espera - ahora) / 1000);
    throw `${emoji} Debes esperar *${restante} segundos* antes de volver a jugar.`;
  }

  const opciones = ['piedra', 'papel', 'tijera'];
  const eleccionBot = opciones[Math.floor(Math.random() * 3)];

  if (!args[0]) {
    return conn.sendMessage(m.chat, {
      image: { url: portada },
      caption: `🎮 *PIEDRA, PAPEL O TIJERA*\n\n🔸 Usa uno de estos comandos:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera`
    }, { quoted: m });
  }

  const eleccionUsuario = text.toLowerCase();

  if (!opciones.includes(eleccionUsuario)) {
    return m.reply(`${emoji} Esa opción no es válida. Usa: piedra, papel o tijera.`);
  }

  let resultado = '';
  let xp = 0;

  if (eleccionUsuario === eleccionBot) {
    resultado = `${emoji2} *Empate.*\n🎁 Premio: +500 XP`;
    xp = 500;
  } else if (
    (eleccionUsuario === 'piedra' && eleccionBot === 'tijera') ||
    (eleccionUsuario === 'papel' && eleccionBot === 'piedra') ||
    (eleccionUsuario === 'tijera' && eleccionBot === 'papel')
  ) {
    resultado = `${emoji} *¡Ganaste!* 🎉\n🎁 Premio: +1000 XP`;
    xp = 1000;
  } else {
    resultado = `☠️ *Perdiste.* ❌\n❌ Penalización: -300 XP`;
    xp = -300;
  }

  usuario.exp += xp;
  usuario.wait = ahora;

  m.reply(`🎲 *Resultado del Juego*\n\n🧍 Tú: ${eleccionUsuario}\n🤖 Bot: ${eleccionBot}\n\n${resultado}`);
};

handler.help = ['ppt'];
handler.tags = ['games'];
handler.command = ['ppt'];
handler.group = true;
handler.register = true;

export default handler;
