let handler = async (m, { conn, text }) => {
    const emoji = '🎮';
    const emoji2 = '⚠️';
    const moneda = '🪙';

    let code = text.trim().toUpperCase();

    if (!code) {
        return conn.reply(m.chat, `${emoji2} *Código no detectado...* \n_Introduce el código antes de que se agote el tiempo..._`, m);
    }

    let codesDB = global.db.data.codes || {};
    let user = global.db.data.users[m.sender];

    if (!codesDB[code]) {
        return conn.reply(m.chat, `${emoji2} *Código inválido.*\n¿Estás seguro de que lo viste en la pizzería?`, m);
    }

    if (codesDB[code].claimedBy.includes(m.sender)) {
        return conn.reply(m.chat, `${emoji2} *Este código ya fue activado por ti.*\n_Recuerda... los animatrónicos no dan segundas oportunidades._`, m);
    }

    if (codesDB[code].claimedBy.length >= 5) {
        return conn.reply(m.chat, `${emoji2} *Código agotado.*\n_Como las baterías de tu linterna..._`, m);
    }

    // Canjear recompensa
    user.coin += codesDB[code].coin;
    codesDB[code].claimedBy.push(m.sender);

    let remaining = 5 - codesDB[code].claimedBy.length;

    conn.reply(m.chat, `✅ *Código activado correctamente*\nHas recibido *${codesDB[code].coin} ${moneda}*\n🎟️ Aún quedan *${remaining} vacantes* para este código.\n\n_Sonidos metálicos resuenan a lo lejos... ¿lo escuchaste?_`, m);
};

handler.help = ['canjear <código>'];
handler.tags = ['economia'];
handler.command = ['canjear'];
handler.group = true;
handler.register = true;

export default handler;
