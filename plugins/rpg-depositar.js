import db from '../lib/database.js';

let handler = async (m, { args }) => {
  const emoji = '💾', emoji2 = '❗', moneda = '💸';
  let user = global.db.data.users[m.sender];

  if (!args[0]) {
    return m.reply(`${emoji} *Ingresa la cantidad de ${moneda} que deseas guardar en la caja fuerte.*\n🎮 *No querrás que Foxy te lo arrebate mientras duermes...*`);
  }

  if ((args[0]) < 1) {
    return m.reply(`${emoji2} Esa cantidad es demasiado baja. *Ni Balloon Boy la querría.*`);
  }

  if (args[0] === 'all') {
    let total = user.coin;
    if (total <= 0) return m.reply(`${emoji2} *Tu cartera está tan vacía como el pasillo oeste.*`);

    user.coin -= total;
    user.bank += total;

    return m.reply(`${emoji} *Has depositado ${total} ${moneda} en el banco.*\n🔒 *Ahora está a salvo... por ahora.*`);
  }

  if (!Number(args[0])) {
    return m.reply(`${emoji2} *Comando incorrecto.*\n📌 Ejemplos:\n> *#depositar 5000*\n> *#depositar all*`);
  }

  let cantidad = parseInt(args[0]);

  if (!user.coin || user.coin < cantidad) {
    return m.reply(`${emoji2} *No tienes suficiente ${moneda} en la cartera.*\n💰 Disponible: *${user.coin} ${moneda}*`);
  }

  user.coin -= cantidad;
  user.bank += cantidad;

  return m.reply(`${emoji} *Has depositado ${cantidad} ${moneda} en el banco.*\n🛡️ *Ningún animatrónico podrá tocarlo... por ahora.*`);
};

handler.help = ['depositar'];
handler.tags = ['rpg'];
handler.command = ['deposit', 'depositar', 'd', 'aguardar'];
handler.group = true;
handler.register = true;

export default handler;
