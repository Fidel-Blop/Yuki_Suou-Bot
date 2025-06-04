let cooldowns = {};

let handler = async (m, { conn }) => {
  let users = global.db.data.users;
  let senderId = m.sender;

  const tiempoEspera = 10 * 60; // 10 minutos de cooldown

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return conn.reply(m.chat, `⏳ *Ya cazaste para el gremio.* Descansa y vuelve en *${tiempoRestante}* para enfrentar nuevos desafíos.`, m);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: 'Batalla con Goblins 🗡️', tipo: 'victoria', coin: randomNumber(20, 40), exp: randomNumber(10, 20), health: 0, mensaje: `¡Goblins derrotados! Recolectaste ${moneda} del botín.` },
    { nombre: 'Ataque del Orco 💥', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `El Orco te golpeó fuerte. Perdiste salud y ${moneda}.` },
    { nombre: 'Desafío al Dragón 🔥', tipo: 'victoria', coin: randomNumber(100, 150), exp: randomNumber(50, 80), health: 0, mensaje: `¡Dragón vencido! Encontraste un tesoro invaluable lleno de ${moneda}.` },
    { nombre: 'Enfrentamiento con Esqueleto ☠️', tipo: 'derrota', coin: randomNumber(-20, -10), exp: randomNumber(5, 10), health: randomNumber(-10, -5), mensaje: `El Esqueleto te atrapó desprevenido. Salud y monedas perdidas.` },
    { nombre: 'Cacería de la Manticora 🦁', tipo: 'victoria', coin: randomNumber(80, 120), exp: randomNumber(40, 60), health: 0, mensaje: `Has cazado a la Manticora. Su pelaje brilló y reveló un botín de ${moneda}.` },
    { nombre: 'Ataque del Troll 🧌', tipo: 'derrota', coin: randomNumber(-50, -20), exp: randomNumber(10, 20), health: randomNumber(-20, -10), mensaje: `El Troll te arrolló. Perdiste salud y ${moneda}.` },
    { nombre: 'Duelo con Licántropo 🐺', tipo: 'victoria', coin: randomNumber(60, 100), exp: randomNumber(30, 50), health: 0, mensaje: `Derrotaste al Licántropo en combate feroz y ganaste ${moneda}.` },
    { nombre: 'Ataque del Minotauro 🪓', tipo: 'derrota', coin: randomNumber(-40, -15), exp: randomNumber(10, 20), health: randomNumber(-15, -5), mensaje: `El Minotauro te golpeó fuerte. Perdiste salud y monedas.` },
    { nombre: 'Caza del Fantasma 👻', tipo: 'victoria', coin: randomNumber(30, 50), exp: randomNumber(20, 40), health: 0, mensaje: `Has exorcizado al Fantasma. Recibiste recompensa en ${moneda}.` },
    { nombre: 'Golpe del Dragón de Hielo ❄️', tipo: 'derrota', coin: randomNumber(-60, -20), exp: randomNumber(15, 30), health: randomNumber(-25, -10), mensaje: `El Dragón de Hielo te congeló. Salud y monedas perdidas.` },
    { nombre: 'Combate con Hidra 🐉', tipo: 'victoria', coin: randomNumber(90, 130), exp: randomNumber(50, 80), health: 0, mensaje: `Has vencido a la Hidra y obtenido un valioso tesoro de ${moneda}.` },
    { nombre: 'Derrota ante el Caballero Caído ⚔️', tipo: 'derrota', coin: randomNumber(-30, -10), exp: randomNumber(5, 10), health: randomNumber(-15, -5), mensaje: `El Caballero Caído te venció. Perdiste salud y monedas.` },
    { nombre: 'Hechizo de la Bruja 🧙', tipo: 'troll', coin: 0, exp: randomNumber(20, 40), health: randomNumber(-10, -5), mensaje: `Una bruja te lanzó un hechizo. Ganas experiencia pero pierdes algo de salud.` },
    { nombre: 'Emboscada de Bandidos 🗡️', tipo: 'troll', coin: 0, exp: randomNumber(15, 30), health: randomNumber(-5, -3), mensaje: `Te emboscaron bandidos, escapaste pero con heridas leves.` },
    { nombre: 'Caza de la Serpiente Gigante 🐍', tipo: 'victoria', coin: randomNumber(50, 80), exp: randomNumber(30, 50), health: 0, mensaje: `Serpiente Gigante cazada. Su piel vale mucho en ${moneda}.` },
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  if (evento.tipo === 'victoria') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health;
  } else if (evento.tipo === 'derrota') {
    users[senderId].coin += evento.coin;
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health; // salud es negativa aquí
  } else if (evento.tipo === 'troll') {
    users[senderId].exp += evento.exp;
    users[senderId].health += evento.health; // salud negativa también
  }

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557967796.jpeg';
  let estadoSalud = users[senderId].health <= 0 ? '*¡Tu salud ha caído a 0! Cuida a tu personaje antes de seguir.*' : `Tu salud actual: ${users[senderId].health}`;

  let info = `╭━〔 🛡️ Gremio de Aventureros 🛡️〕\n` +
             `┃Misión: *${evento.nombre}*\n` +
             `┃Evento: ${evento.mensaje}\n` +
             `┃Recompensa: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} ${moneda} y +${evento.exp} XP.\n` +
             `┃${estadoSalud}\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'gremio.jpg', info, fkontak);

  await global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['gremio'];
handler.command = ['gremio', 'mision'];
handler.register = true;
handler.group = true;

export default handler;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
