const handler = (m) => m;

handler.before = async function (m) {
  this.suit = this.suit || {};
  if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0;

  const room = Object.values(this.suit).find(r => r.id && r.status && [r.p, r.p2].includes(m.sender));
  if (!room) return;

  let winner = '';
  let empate = false;

  // Rechazo o aceptación del duelo
  if (
    m.sender === room.p2 &&
    /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) &&
    m.isGroup &&
    room.status === 'wait'
  ) {
    if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
      const cancelMsg = `💀 @${room.p2.split`@`[0]} rechazó el duelo... La oscuridad se cierne. PVP cancelado.`;
      m.reply(cancelMsg, null, { mentions: this.parseMention(cancelMsg) });
      delete this.suit[room.id];
      return !0;
    }

    room.status = 'play';
    room.asal = m.chat;
    clearTimeout(room.waktu);

    const startMsg = `🕹️ *Duelo FNaF LATAM iniciado* 🕹️\n\n@${room.p.split`@`[0]} y @${room.p2.split`@`[0]}, elige tu destino en privado.\n\n⚔️ *Elige:* piedra, papel o tijera.\nSolo uno sobrevivirá...`;
    m.reply(startMsg, m.chat, { mentions: this.parseMention(startMsg) });

    const instruction = `👻 *Tus opciones son:* \n- piedra \n- papel \n- tijera\n\nResponde rápido o el destino te abandonará.\n🏆 Ganador: +${room.poin}XP\n☠️ Perdedor: -${room.poin_lose}XP`;
    this.sendMessage(room.p, { text: instruction }, { quoted: m });
    this.sendMessage(room.p2, { text: instruction }, { quoted: m });

    room.waktu_milih = setTimeout(() => {
      let msg;
      if (!room.pilih && !room.pilih2) {
        msg = `⌛ El silencio es mortal. Ninguno eligió y el duelo termina en la sombra.`;
      } else {
        winner = !room.pilih ? room.p2 : room.p;
        const perdedor = winner === room.p ? room.p2 : room.p;
        msg = `☠️ @${perdedor.split`@`[0]} no respondió a tiempo... El duelo termina sin gloria.`;
        db.data.users[winner].exp += room.poin + room.poin_bot;
        db.data.users[perdedor].exp -= room.poin_lose;
      }
      this.sendMessage(m.chat, { text: msg }, { quoted: m, mentions: this.parseMention(msg) });
      delete this.suit[room.id];
    }, room.timeout);

    return !0;
  }

  const isP1 = m.sender === room.p;
  const isP2 = m.sender === room.p2;
  const validOpt = /^(piedra|papel|tijera)$/i;
  const lower = (s) => s.toLowerCase();

  // Elección jugador 1
  if (isP1 && validOpt.test(m.text) && !room.pilih && !m.isGroup) {
    room.pilih = lower(validOpt.exec(m.text)[0]);
    m.reply(`🔪 Has elegido: *${room.pilih}*\nEspera en las sombras... o regresa al grupo.`);
    if (!room.pilih2) this.reply(room.p2, `🎮 Tu adversario ha hablado. ¡Tu turno!`, 0);
    return !0;
  }

  // Elección jugador 2
  if (isP2 && validOpt.test(m.text) && !room.pilih2 && !m.isGroup) {
    room.pilih2 = lower(validOpt.exec(m.text)[0]);
    m.reply(`🔪 Has elegido: *${room.pilih2}*\nEl reloj corre... Espera o vuelve al grupo.`);
    if (!room.pilih) this.reply(room.p, `🎮 Tu adversario ha hablado. ¡Tu turno!`, 0);
    return !0;
  }

  // Cuando ambos eligieron
  if (room.pilih && room.pilih2) {
    clearTimeout(room.waktu_milih);

    const p1 = room.pilih;
    const p2 = room.pilih2;

    // Determinar ganador
    if (p1 === p2) {
      empate = true;
    } else if (
      (p1 === 'piedra' && p2 === 'tijera') ||
      (p1 === 'tijera' && p2 === 'papel') ||
      (p1 === 'papel' && p2 === 'piedra')
    ) {
      winner = room.p;
    } else {
      winner = room.p2;
    }

    const resultMsg = `
☠️ *RESULTADO DEL DUEL* ☠️${empate ? '\n⚖️ ¡Empate mortal!' : ''}
👤 @${room.p.split`@`[0]} eligió: *${room.pilih}* ${empate ? '' : winner === room.p ? `🏆 *Sobrevivió +${room.poin}XP*` : `☠️ *Caído -${room.poin_lose}XP*`}
👤 @${room.p2.split`@`[0]} eligió: *${room.pilih2}* ${empate ? '' : winner === room.p2 ? `🏆 *Sobrevivió +${room.poin}XP*` : `☠️ *Caído -${room.poin_lose}XP*`}
`.trim();

    this.reply(room.asal, resultMsg, m, { mentions: [room.p, room.p2] });

    if (!empate) {
      db.data.users[winner].exp += room.poin + room.poin_bot;
      const perdedor = winner === room.p ? room.p2 : room.p;
      db.data.users[perdedor].exp -= room.poin_lose;
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
