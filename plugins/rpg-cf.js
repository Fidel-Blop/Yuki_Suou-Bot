let users = {};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const emoji = '🪙';
    const emoji2 = '❌';
    const moneda = '💸';
    const botname = 'NightShiftBot';

    let [eleccion, cantidad] = text.trim().split(' ');

    if (!eleccion || !cantidad) {
        return m.reply(`${emoji} *¿Cara o cruz? Y dime cuánto apuestas...*\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    eleccion = eleccion.toLowerCase();
    cantidad = parseInt(cantidad);

    if (eleccion !== 'cara' && eleccion !== 'cruz') {
        return m.reply(`${emoji2} *Ese lado de la moneda no existe...* Elige *cara* o *cruz*.\nEjemplo: *${usedPrefix + command} cara 50*`);
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        return m.reply(`${emoji2} *¿Qué clase de apuesta es esa?* Ingresa una cantidad válida.\nEjemplo: *${usedPrefix + command} cruz 100*`);
    }

    let user = global.db.data.users[m.sender];
    if (user.coin < cantidad) {
        return m.reply(`${emoji2} *Insuficientes ${moneda}...* Solo tienes ${user.coin} disponibles.`);
    }

    // La moneda gira en la oscuridad...
    let resultado = Math.random() < 0.5 ? 'cara' : 'cruz';
    let mensaje = `${emoji} *La moneda gira... y cae en ${resultado.toUpperCase()}.*\n`;

    if (resultado === eleccion) {
        user.coin += cantidad;
        mensaje += `🎉 *¡Victoria inesperada!* Ganaste *+${cantidad} ${moneda}*.`;
    } else {
        user.coin -= cantidad;
        mensaje += `💀 *La suerte te abandonó...* Perdiste *-${cantidad} ${moneda}*.`;
    }

    conn.reply(m.chat, mensaje, m);
};

handler.help = ['cf <cara|cruz> <cantidad>'];
handler.tags = ['economia'];
handler.command = ['cf', 'coinflip', 'caraocruz'];
handler.group = true;
handler.register = true;

export default handler;
