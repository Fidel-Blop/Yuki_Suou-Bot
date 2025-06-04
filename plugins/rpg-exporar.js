let cooldowns = {};

let handler = async (m, { conn, command }) => {
  const emoji = '👀';
  const moneda = '💸';
  const senderId = m.sender;
  let users = global.db.data.users;
  const tiempoEspera = 5 * 60; // 5 minutos en segundos

  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempoEspera * 1000 - Date.now()) / 1000));
    return m.reply(`${emoji} Ya exploraste los oscuros pasillos recientemente.\n⏳ *Espera ${tiempoRestante} antes de aventurarte de nuevo...* \n*No dejes que Freddy te atrape.*`);
  }

  cooldowns[senderId] = Date.now();

  if (!users[senderId]) {
    users[senderId] = { health: 100, coin: 0, exp: 0 };
  }

  const eventos = [
    { nombre: '💰 Cofre Misterioso', coin: 100, exp: 50, health: 0, mensaje: `¡Encontraste un cofre con ${moneda}!` },
    { nombre: '🐻 Ataque del Animatrónico', coin: -50, exp: 20, health: -10, mensaje: `Un animatrónico te atacó y perdiste algunas ${moneda} mientras escapabas.` },
    { nombre: '🕸️ Trampa del Pasillo', coin: 0, exp: 10, health: 0, mensaje: 'Caiste en una trampa, pero lograste salir ileso.' },
    { nombre: '💎 Rayo de Energía', coin: 200, exp: 100, health: 0, mensaje: `Una energía misteriosa te otorgó ${moneda} extra.` },
    { nombre: '🧙 Sabio de la Pizzería', coin: 50, exp: 30, health: 0, mensaje: 'Un viejo sabio te contó secretos y te recompensó.' },
    { nombre: '⚔️ Emboscada Oculta', coin: -30, exp: 15, health: -10, mensaje: `Un enemigo oculto te atacó y perdiste algo de ${moneda}.` },
    { nombre: '🍄 Setas del Mantenimiento', coin: 0, exp: 5, health: 0, mensaje: 'Comiste unas setas extrañas, pero no pasó nada raro.' }
  ];

  let evento = eventos[Math.floor(Math.random() * eventos.length)];

  users[senderId].coin += evento.coin;
  users[senderId].exp += evento.exp;
  users[senderId].health += evento.health;

  // Evitar que la salud sea negativa
  if(users[senderId].health < 0) users[senderId].health = 0;

  let img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557951898.jpeg';
  let info = `╭━〔 *Exploración en Freddy's* 〕\n` +
             `┃ Misión: *${evento.nombre}*\n` +
             `┃ Evento: ${evento.mensaje}\n` +
             `┃ Recompensa: ${evento.coin > 0 ? '+' : '-'}${Math.abs(evento.coin)} ${moneda} y +${evento.exp} XP\n` +
             `┃ Salud: ${evento.health < 0 ? `- ${Math.abs(evento.health)}` : '+ 0'} (Ahora tienes *${users[senderId].health}* puntos)\n` +
             `╰━━━━━━━━━━━━⬣`;

  await conn.sendFile(m.chat, img, 'exploracion.jpg', info, m);

  global.db.write();
};

handler.tags = ['rpg'];
handler.help = ['explorar'];
handler.command = ['explorar', 'bosque'];
handler.register = true;
handler.group = true;

export default handler;

function segundosAHMS(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;
  return `${minutos} minutos y ${segundosRestantes} segundos`;
}
