let cooldowns = {};

let handler = async (m, { conn, usedPrefix }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  // Tiempo de espera: 8 minutos (cambiado a segundos para mejor control)
  let cooldownTime = 8 * 60;

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < cooldownTime * 1000) {
    let remaining = segundosAHMS(Math.ceil((cooldowns[senderId] + cooldownTime * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏳ *No tan rápido, aventurero.* Ya exploraste la mazmorra hace poco.\nEspera *${remaining}* para volver a desafiar las sombras.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  // Eventos mazmorra - estilo FNaF LATAM, con toque oscuro y misterioso
  const eventos = [
    {
      nombre: 'Cámara del Guardián Caído',
      tipo: 'victoria',
      coin: randomNumber(180, 350),
      exp: randomNumber(60, 120),
      health: 0,
      mensaje: `🗡️ *Victoria:* Has derrotado al Guardián Caído y saqueado su tesoro oscuro. 💰`
    },
    {
      nombre: 'Sótano de los Espectros',
      tipo: 'derrota',
      coin: randomNumber(-90, -50),
      exp: randomNumber(10, 25),
      health: randomNumber(-20, -10),
      mensaje: `👻 *Derrota:* Los espectros te atraparon en sus redes etéreas. Perdiste ${moneda} y parte de tu salud.`
    },
    {
      nombre: 'Cripta Olvidada',
      tipo: 'victoria',
      coin: randomNumber(300, 450),
      exp: randomNumber(120, 180),
      health: 0,
      mensaje: `💎 *Tesoro antiguo:* Encontraste gemas brillantes y riquezas olvidadas.`
    },
    {
      nombre: 'Trampa del Laberinto',
      tipo: 'trampa',
      coin: 0,
      exp: randomNumber(8, 15),
      health: 0,
      mensaje: `⚠️ *Alerta:* Activaste una trampa. Escapaste ileso, pero sin ganancias.`
    },
    {
      nombre: 'Guarida del Demonio',
      tipo: 'derrota',
      coin: randomNumber(-170, -100),
      exp: randomNumber(25, 45),
      health: randomNumber(-35, -25),
      mensaje: `🔥 *Peligro extremo:* El demonio te atacó con fuego infernal. Perdiste riquezas y salud.`
    },
    {
      nombre: 'Santuario Luminoso',
      tipo: 'victoria',
      coin: randomNumber(120, 250),
      exp: randomNumber(40, 75),
      health: 0,
      mensaje: `✨ *Suerte:* Encontraste un cofre lleno de riquezas que brillan con luz propia.`
    },
    {
      nombre: 'Laberinto Perdido',
      tipo: 'trampa',
      coin: 0,
      exp: randomNumber(8, 18),
      health: 0,
      mensaje: `🌪️ *Confusión:* Te perdiste en el laberinto y saliste sin nada.`
    },
    {
      nombre: 'Ruinas del Ancestro',
      tipo: 'victoria',
      coin: randomNumber(180, 350),
      exp: randomNumber(80, 140),
      health: 0,
      mensaje: `🏺 *Historia viva:* Encontraste artefactos valiosos de épocas olvidadas.`
    },
    {
      nombre: 'Nido del Dragón',
      tipo: 'derrota',
      coin: randomNumber(-220, -130),
      exp: randomNumber(25, 50),
      health: randomNumber(-40, -30),
      mensaje: `🐉 *Peligro:* El dragón te lanzó una llamarada. Escapaste con heridas y pérdidas.`
    },
    {
      nombre: 'Sabio de las Sombras',
      tipo: 'victoria',
      coin: randomNumber(70, 130),
      exp: randomNumber(35, 60),
      health: 0,
      mensaje: `🧙‍♂️ *Sabiduría:* El sabio compartió secretos y te recompensó por tu valor.`
    },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  // Actualizar stats según el tipo de evento
  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health = Math.min(users[senderId].health + evento.health, 100);
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin = Math.max(users[senderId].coin + evento.coin, 0);
    users[senderId].exp += evento.exp;
    users[senderId].health = Math.max(users[senderId].health + evento.health, 0);
  } else if (evento.tipo === 'trampa') {
    users[senderId].exp += evento.exp;
  }

  let img = 'https://pin.it/1eO5ozrJV';

  let info = `╭━〔 🏰 Mazmorra Oscura 〕━⬣\n` +
             `┃ *Misión:* ${evento.nombre}\n` +
             `┃ *Evento:* ${evento.mensaje}\n` +
             `┃ *Recompensa:* ${evento.coin > 0 ? '+' : ''}${evento.coin} ${moneda} | +${evento.exp} XP\n` +
             `┃ *Salud:* ${users[senderId].health} ❤️\n` +
             `╰━━━━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'mazmorra.jpg', info, fkontak);

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['mazmorra', 'dungeon', 'cueva', 'explorar'];
handler.command = ['mazmorra', 'dungeon', 'cueva', 'explorar'];
handler.register = true;
handler.group = true;

export default handler;

// Función para número aleatorio
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Convierte segundos a minutos y segundos
function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos}m ${segundosRestantes}s`;
}
