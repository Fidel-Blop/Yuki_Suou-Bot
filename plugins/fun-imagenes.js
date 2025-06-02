// Código modificado para FNaF LATAM by Fidel-Blop
const handler = async (m, { conn, command, text }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

    // CHUPA
    if (command == 'chupa' || command == 'chupalo') {
        const captionchupa = `*[ 🍭 ] @${who.split('@')[0]} ESTÁ LISTO PARA SERVIR COMO DULCE...*`
        conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/dc717696efd6182a47f07.jpg' }, caption: captionchupa, mentions: conn.parseMention(captionchupa) }, { quoted: m });
    }

    // APLAUSO
    if (command == 'aplauso') {
        const captionap = `*[ 👏 ] FELICIDADES, @${who.split('@')[0]}. ACABAS DE DEMOSTRAR QUE EL CEREBRO NO ES NECESARIO PARA EXISTIR.*`
        conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/0e40f5c0cf98dffc55045.jpg' }, caption: captionap, mentions: conn.parseMention(captionap) }, { quoted: m });
    }

    // MARRÓN / NEGRO
    if (command == 'marron' || command == 'negro') {
        const captionma = `*[ 💩 ] @${who.split('@')[0]} ACABA DE SALIR DEL BAÑO... Y SE NOTA.*`
        conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/5592d6bd38d411554018c.png' }, caption: captionma, mentions: conn.parseMention(captionma) }, { quoted: m });
    }

    // SUICIDAR
    if (command == 'suicide' || command == 'suicidar') {
        const caption = `*[ ⚰️ ] @${m.sender.split('@')[0]} NO SOPORTÓ LA PRESIÓN DEL LORE DE FNAF... Y SE FUE AL MÁS ALLÁ.*`
        conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/w3v3e0.jpg' }, caption: caption, mentions: conn.parseMention(caption) }, { quoted: m });

        // Borra al usuario (de broma)
        delete global.db.data.users[m.sender]; 
    }
};

handler.command = ['chupalo', 'chupa', 'aplauso', 'negro', 'marron', 'suicidar', 'suicide']
handler.group = true
handler.register = true

export default handler;
