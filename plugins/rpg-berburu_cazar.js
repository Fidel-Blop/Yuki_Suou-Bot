const handler = async (m, { conn }) => {
  const user = global.db.data.users[m.sender];

  const emoji = '🔦';
  const sonidos = [
    'un crujido entre los árboles...',
    'pasos suaves que se acercan...',
    'una respiración detrás tuyo...',
    'un grito lejano...',
    'algo moviéndose en la oscuridad...'
  ];

  const suspenso = sonidos[Math.floor(Math.random() * sonidos.length)];

  // Generar recursos aleatorios
  const loot = {
    venado: Math.floor(Math.random() * 5),
    lobo: Math.floor(Math.random() * 4),
    oso: Math.floor(Math.random() * 3),
    zorro: Math.floor(Math.random() * 4),
    serpiente: Math.floor(Math.random() * 5),
    cuervo: Math.floor(Math.random() * 6),
    murcielago: Math.floor(Math.random() * 7),
    conejo: Math.floor(Math.random() * 5),
    ciervo: Math.floor(Math.random() * 3),
    buho: Math.floor(Math.random() * 3),
  };

  // Asignar el loot al usuario
  user.venado += loot.venado;
  user.lobo += loot.lobo;
  user.oso += loot.oso;
  user.zorro += loot.zorro;
  user.serpiente += loot.serpiente;
  user.cuervo += loot.cuervo;
  user.murcielago += loot.murcielago;
  user.conejo += loot.conejo;
  user.ciervo += loot.ciervo;
  user.buho += loot.buho;

  // Mensaje estilo FNaF LATAM
  const mensaje = `
${emoji} 𝘊𝘢𝘻𝘢 𝘕𝘰𝘤𝘵𝘶𝘳𝘯𝘢: 𝘳𝘦𝘱𝘰𝘳𝘵𝘦 𝘥𝘦 𝘦𝘴𝘱𝘦𝘤𝘪𝘦𝘴 🕯️
───────────────
🦌 Venados: +${loot.venado}
🐺 Lobos: +${loot.lobo}
🐻 Osos: +${loot.oso}
🦊 Zorros: +${loot.zorro}
🐍 Serpientes: +${loot.serpiente}
🐦 Cuervos: +${loot.cuervo}
🦇 Murciélagos: +${loot.murcielago}
🐇 Conejos: +${loot.conejo}
🦌 Ciervos: +${loot.ciervo}
🦉 Búhos: +${loot.buho}
───────────────
🎧 Mientras cazabas, escuchaste *${suspenso}*
${emoji} *Recuerda mirar atrás...*`;

  await conn.reply(m.chat, mensaje.trim(), m);
};

handler.help = ['cazar', 'berburu'];
handler.tags = ['rpg'];
handler.command = ['cazar', 'hunt', 'berburu'];
handler.register = true;
handler.group = true;

export default handler;
