let handler = async (m, { conn, usedPrefix }) => {
    const emoji4 = '📵';
    const moneda = '🪙';

    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;

    if (who == conn.user.jid) return m.reply('❌ *¡No puedes espiar mi cartera, guardia nocturno!*');
    if (!(who in global.db.data.users)) 
        return conn.reply(m.chat, `${emoji4} *Usuario no registrado en los archivos del sistema...*\n_Tal vez desapareció como los demás..._`, m);

    let user = global.db.data.users[who];
    let texto = who == m.sender
        ? `🎭 *Cartera Digital - FNaF LATAM*\n\n🔦 Guardián: *${conn.getName(who)}*\n💸 Dinero en mano: *${user.coin} ${moneda}*\n\n_Si el sistema falla... esta es tu única esperanza._`
        : `🎭 *Cartera Detectada*\n\n👤 Usuario: *@${who.split('@')[0]}*\n💰 Fondos visibles: *${user.coin} ${moneda}*\n\n_Todo queda registrado... incluso esto._`;

    await conn.reply(m.chat, texto, null, { mentions: [who] });
};

handler.help = ['wallet'];
handler.tags = ['economy'];
handler.command = ['wallet', 'cartera'];
handler.group = true;
handler.register = true;

export default handler;
