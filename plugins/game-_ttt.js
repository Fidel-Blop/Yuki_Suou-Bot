import { format } from 'util';
const debugMode = false;
const winScore = 4999;
const playScore = 99;

export async function before(m) {
  this.game ??= {};
  const room = Object.values(this.game).find(room =>
    room.id?.startsWith('tictactoe') &&
    room.game &&
    room.state === 'PLAYING' &&
    [room.game.playerX, room.game.playerO].includes(m.sender)
  );

  if (!room) return true;

  const surrenderRegex = /^([1-9]|(me)?nyerah|rendirse|RENDIRSE|surr?ender)$/i;
  if (!surrenderRegex.test(m.text)) return true;

  const isSurrender = !/^[1-9]$/.test(m.text);
  if (!isSurrender && m.sender !== room.game.currentTurn) return true;

  if (debugMode) {
    m.reply('[DEBUG]\n' + format({ isSurrender, text: m.text }));
  }

  const move = !isSurrender ? room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1) : null;
  if (!isSurrender && move < 1) {
    m.reply({
      '-3': '❌ El juego ya ha terminado.',
      '-2': '❌ Movimiento inválido.',
      '-1': '❌ Posición inválida.',
      '0': '❌ Posición inválida.'
    }[move]);
    return true;
  }

  const isWin = room.game.winner === m.sender || isSurrender;
  const isTie = room.game.board === 511;

  const symbols = {
    X: '❎', O: '⭕',
    1: '1️⃣', 2: '2️⃣', 3: '3️⃣',
    4: '4️⃣', 5: '5️⃣', 6: '6️⃣',
    7: '7️⃣', 8: '8️⃣', 9: '9️⃣'
  };
  const boardVisual = room.game.render().map(v => symbols[v]);

  if (isSurrender) {
    room.game._currentTurn = m.sender === room.game.playerX;
  }

  const winner = isSurrender ? room.game.currentTurn : room.game.winner;
  const str = `
🎮 *TRES EN RAYA* 🎮

❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}

    ${boardVisual.slice(0, 3).join('')}
    ${boardVisual.slice(3, 6).join('')}
    ${boardVisual.slice(6).join('')}

${isWin
  ? `🏆 @${winner.split('@')[0]} ganó y recibe +${winScore} XP 🥳`
  : isTie
  ? '🤝 El juego terminó en empate.'
  : `🎯 Turno de @${room.game.currentTurn.split('@')[0]}`}
`.trim();

  const users = global.db.data.users;

  if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
    room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;
  }

  if (room.x !== room.o) {
    await this.sendMessage(room.x, { text: str, mentions: this.parseMention(str) }, { quoted: m });
  }
  await this.sendMessage(room.o, { text: str, mentions: this.parseMention(str) }, { quoted: m });

  if (isWin || isTie) {
    users[room.game.playerX].exp += playScore;
    users[room.game.playerO].exp += playScore;
    if (isWin) users[winner].exp += winScore - playScore;
    if (debugMode) m.reply('[DEBUG]\n' + format(room));
    delete this.game[room.id];
  }

  return true;
}
