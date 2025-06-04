import db from '../lib/database.js'

let handler = async (m, { args }) => {
  let user = global.db.data.users[m.sender]
  let moneda = '💰 monedas';
  let emoji = '🏦';
  let emojiError = '⚠️';

  if (!args[0]) return m.reply(`${emojiError} *¡Ey, minero!* Debes decir cuánto ${moneda} quieres retirar.\n\nEjemplo:\n> *#retirar 5000*\n> *#retirar all*`);

  if (args[0].toLowerCase() === 'all') {
    let count = parseInt(user.bank);
    if (!count || count <= 0) return m.reply(`${emojiError} No tienes ${moneda} en el banco para retirar.`);
    user.bank -= count;
    user.coin += count;
    await m.reply(`${emoji} *¡Retiro exitoso!*\nHas sacado *${count} ${moneda}* de tu banco.\n\n⚠️ ¡Cuidado! Ahora están en tu bolsillo, y pueden robarte.`);
    return;
  }

  let count = parseInt(args[0]);
  if (isNaN(count) || count <= 0) return m.reply(`${emojiError} Eso no es un número válido.\nUsa:\n> *#retirar 25000*\n> *#retirar all*`);

  if (!user.bank || user.bank <= 0) return m.reply(`${emojiError} No tienes ${moneda} guardadas en el banco.`);

  if (user.bank < count) return m.reply(`${emojiError} Solo tienes *${user.bank} ${moneda}* guardadas en el banco. No puedes retirar más.`);

  user.bank -= count;
  user.coin += count;

  await m.reply(`${emoji} *Retiro exitoso*\nHas retirado *${count} ${moneda}* del banco.\n⚠️ Ahora están en tu bolsillo y pueden ser robados. ¡Cuídate!`);
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['withdraw', 'retirar', 'with']
handler.group = true
handler.register = true

export default handler
