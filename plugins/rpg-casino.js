import db from '../lib/database.js';

let buatall = 1;
let cooldowns = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const emoji = '🎰';
    const emoji2 = '❌';
    const emoji3 = '⏳';
    const moneda = '🪙';
    const botname = 'NightShiftBot';

    let user = global.db.data.users[m.sender];
    let randomBot = Math.floor(Math.random() * 101);
    let randomPlayer = Math.floor(Math.random() * 55);
    let apuesta = args[0];
    let who = m.fromMe ? conn.user.jid : m.sender;
    let username = conn.getName(who);
    let tiempoEspera = 15;

    if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
        let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000));
        return conn.reply(m.chat, `${emoji3} *Ya jugaste con el sistema hace poco...*\n🕐 Espera *${tiempoRestante}* antes de hacer otra apuesta.`, m);
    }

    cooldowns[m.sender] = Date.now();
    apuesta = /all/i.test(apuesta) ? Math.floor(user.limit / buatall) : parseInt(apuesta);
    if (isNaN(apuesta) || apuesta < 1) return conn.reply(m.chat,
        `${emoji} *Ingresa la cantidad de ${moneda} que deseas apostar contra ${botname}.*\n\n📌 Ejemplo:\n> *${usedPrefix + command} 10*`, m);

    if (user.limit < apuesta) return conn.reply(m.chat, `${emoji2} *No tienes suficiente energía nocturna (💠 limit) para esta jugada...*\n💠 Disponibles: ${user.limit}`, m);

    let resultado;
    if (randomPlayer > randomBot) {
        user.limit += apuesta;
        resultado = `🎉 *¡Ganaste esta ronda contra el sistema!*\n\n🎮 Jugador: *${randomPlayer}*\n🤖 Bot: *${randomBot}*\n💠 Recompensa: +${apuesta} energía`;
    } else if (randomPlayer < randomBot) {
        user.limit -= apuesta;
        resultado = `☠️ *Perdiste... El sistema sigue ganando*\n\n🎮 Jugador: *${randomPlayer}*\n🤖 Bot: *${randomBot}*\n💠 Perdida: -${apuesta} energía`;
    } else {
        resultado = `🤝 *Empate total en esta ronda*\n\n🎮 Jugador: *${randomPlayer}*\n🤖 Bot: *${randomBot}*\n💠 Tus fondos no se movieron.`;
    }

    conn.reply(m.chat, `🎭 *Simulador Nocturno de Apuestas - FNaF LATAM*\n\n📟 Usuario: *${username}*\n\n${resultado}\n\n🔦 *Recuerda: todo está siendo observado... incluso por los animatrónicos.*`, m);
};

handler.help = ['casino <cantidad>'];
handler.tags = ['economia'];
handler.command = ['casino', 'apostar'];
handler.group = true;
handler.register = true;

export default handler;

// ⏱️ Función para convertir segundos a formato HH:MM:SS
function segundosAHMS(segundos) {
    let horas = Math.floor(segundos / 3600);
    let minutos = Math.floor((segundos % 3600) / 60);
    let segundosRestantes = segundos % 60;
    return [horas, minutos, segundosRestantes]
        .map(v => v.toString().padStart(2, '0'))
        .join(':');
}
