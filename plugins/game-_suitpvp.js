const handler = (m) => m;

handler.before = async function (m) {
  this.suit = this.suit || {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;

  const room = Object.values(this.suit).find(r => r.id && r.status && [r.p, r.p2].includes(m.sender));
  if (!room) return;

  let win = '';
  let tie = false;

  if (
    m.sender === room.p2 &&
    /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) &&
    m.isGroup &&
    room.status === 'wait'
  ) {
    if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
      const cancelMsg = `❌ @${room.p2.split`@`[0]} rechazó el duelo. PVP cancelado.`;
      m.reply(cancelMsg, null, { mentions: this.parseMention(cancelMsg) });
      delete this.suit[room.id];
      return !0;
    }

    room.status = 'play';
    room.asal = m.chat;
    clearTimeout(room.waktu);

    const startMsg = `🎮 *PVP iniciado* 🎮\n\nSe han enviado las opciones a los chats privados de @${room.p.split`@`[0]} y @${room.p2.split`@`[0]}\n\n📩 *Elige piedra, papel o tijera en privado con el bot.*`;
    m.reply(startMsg, m.chat, { mentions: this.parseMention(startMsg) });

    const instruction = `🕹️ Elige una opción:\n- piedra\n- papel\n- tijera\n\n🧠 Responde con una de las opciones.\n🏆 Ganador: +${room.poin}XP\n😵 Perdedor: -${room.poin_lose}XP`;
    this.sendMessage(room.p, { text: instruction }, { quoted: m });
    this.sendMessage(room.p2, { text: instruction }, { quoted: m });

    room.waktu_milih = setTimeout(() => {
      let msg;
      if (!room.pilih && !room.pilih2) {
        msg = `⌛ Ningún jugador eligió. El PVP ha sido cancelado.`;
      } else {
        win = !room.pilih ? room.p2 : room.p;
        const loser = win === room.p ? room.p2 : room.p;
        msg = `⚠️ @${loser.split`@`[0]} no eligió a tiempo. PVP cancelado.`;
        db.data.users[win].exp += room.poin + room.poin_bot;
        db.data.users[loser].exp -= room.poin_lose;
      }
      this.sendMessage(m.chat, { text: msg }, { quoted: m, mentions: this.parseMention(msg) });
      delete this.suit[room.id];
    }, room.timeout);

    return !0;
  }

  const isPlayer1 = m.sender === room.p;
  const isPlayer2 = m.sender === room.p2;
  const validOption = /^(piedra|papel|tijera)$/i;
  const lower = (s) => s.toLowerCase();

  if (isPlayer1 && validOption.test(m.text) && !room.pilih && !m.isGroup) {
    room.pilih = lower(validOption.exec(m.text)[0]);
    m.reply(`✅ Elegiste: *${room.pilih}*\nEspera el turno del oponente o vuelve al grupo.`);
    if (!room.pilih2) this.reply(room.p2, `🎮 Tu oponente ya eligió. ¡Es tu turno!`, 0);
    return !0;
  }

  if (isPlayer2 && validOption.test(m.text) && !room.pilih2 && !m.isGroup) {
    room.pilih2 = lower(validOption.exec(m.text)[0]);
    m.reply(`✅ Elegiste: *${room.pilih2}*\nEspera el turno del oponente o vuelve al grupo.`);
    if (!room.pilih) this.reply(room.p, `🎮 Tu oponente ya eligió. ¡Es tu turno!`, 0);
    return !0;
  }

  if (room.pilih && room.pilih2) {
    clearTimeout(room.waktu_milih);

    const p1 = room.pilih;
    const p2 = room.pilih2;

    // lógica para determinar el ganador
    if (p1 === p2) {
      tie = true;
    } else if (
      (p1 === 'piedra' && p2 === 'tijera') ||
      (p1 === 'tijera' && p2 === 'papel') ||
      (p1 === 'papel' && p2 === 'piedra')
    ) {
      win = room.p;
    } else {
      win = room.p2;
    }

    const resultMsg = `
*⚔️ RESULTADOS DEL PVP ⚔️*${tie ? '\n🤝 ¡Empate!' : ''}
👤 @${room.p.split`@`[0]} eligió: *${room.pilih}* ${tie ? '' : win === room.p ? `🏆 *Ganó +${room.poin}XP*` : `❌ *Perdió -${room.poin_lose}XP*`}
👤 @${room.p2.split`@`[0]} eligió: *${room.pilih2}* ${tie ? '' : win === room.p2 ? `🏆 *Ganó +${room.poin}XP*` : `❌ *Perdió -${room.poin_lose}XP*`}
`.trim();

    this.reply(room.asal, resultMsg, m, { mentions: [room.p, room.p2] });

    if (!tie) {
      db.data.users[win].exp += room.poin + room.poin_bot;
      const loser = win === room.p ? room.p2 : room.p;
      db.data.users[loser].exp -= room.poin_lose;
    }

    delete this.suit[room.id];
    return !0;
  }

  return !1;
};

handler.exp = 0;
export default handler;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
