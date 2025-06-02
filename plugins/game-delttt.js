let handler = async (m, { conn }) => {
  // Buscar la partida donde el usuario esté jugando
  let room = Object.values(conn.game).find(
    room => room.id.startsWith('tictactoe') && 
    [room.game.playerX, room.game.playerO].includes(m.sender)
  )
  
  if (!room) {
    return conn.reply(m.chat, `⚠️ No estás en ninguna partida activa de TicTacToe.`, m)
  }
  
  // Eliminar la partida para reiniciar
  delete conn.game[room.id]
  
  await conn.reply(m.chat, `✅ La sesión de *TicTacToe* ha sido reiniciada. Puedes iniciar una nueva partida cuando quieras.`, m)
}

handler.help = ['delttt']
handler.tags = ['game']
handler.command = ['delttc', 'delttt', 'delxo', 'tictactoe']
handler.group = true
handler.register = true

export default handler
