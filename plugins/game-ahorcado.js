const palabras = [
  "gato", "perro", "pajaro", "elefante", "tigre", "ballena", "mariposa",
  "tortuga", "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo",
  "pinguino", "delfin", "serpiente", "hamster", "mosquito", "abeja",
  "television", "computadora", "botsito", "reggaeton", "economia",
  "electronica", "facebook", "whatsapp", "instagram", "tiktok",
  "milanesa", "presidente", "bot", "peliculas"
];

const intentosMaximos = 6;
const gam = new Map();

function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : "◻️").join(' ');
}

function mostrarAhorcado(intentos) {
  const partes = [
    "╭────👻────╮",
    "│   👤     │",
    intentos < 6 ? "│   🎩     │" : "│          │",
    intentos < 5 ? "│  👕/     │" :
    intentos < 4 ? "│  👕/|    │" :
    intentos < 3 ? "│  👕/|\\   │" : "│          │",
    intentos < 2 ? "│  👖/      │" :
    intentos < 1 ? "│  👖/ \\    │" : "│          │",
    "│          │",
    "╰──────────╯"
  ];
  return partes.slice(0, intentosMaximos - intentos + 6).join("\n");
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
  if (intentos <= 0) {
    gam.delete(sender);
    return `☠️ *¡AH NO! PERDISTE, NIÑO...*\n\n🔤 La palabra secreta era: *${palabra}*\n\n${mostrarAhorcado(intentos)}\n\n💀 ¡Intenta no morir la próxima vez!`;
  } else if (!mensaje.includes("◻️")) {
    let expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 3500 + 1500) : Math.floor(Math.random() * 400 + 100);
    global.db.data.users[sender].exp += expGanada;
    gam.delete(sender);
    return `🎉 *¡LO LOGRASTE, SUPERVIVIENTE!*\n\n✅ Palabra adivinada: *${palabra}*\n🔓 EXP ganada: *${expGanada}*\n\n🔧 ¡Sigue jugando si quieres desbloquear más premios!`;
  } else {
    return `${mostrarAhorcado(intentos)}\n\n🔤 Palabra: ${mensaje}`;
  }
}

let handler = async (m, { conn }) => {
  if (gam.has(m.sender)) {
    return conn.reply(m.chat, "🛑 Ya estás en medio de un juego, niñ@. ¡Termina ese primero o Freddy irá por ti! 👻", m);
  }

  const palabra = elegirPalabraAleatoria();
  const letrasAdivinadas = [];
  const intentos = intentosMaximos;
  const mensaje = ocultarPalabra(palabra, letrasAdivinadas);

  gam.set(m.sender, { palabra, letrasAdivinadas, intentos });

  let texto = `🔪 *AHORCADO FNaF LATAM* 🔪\n\n🎯 Adivina la palabra secreta antes de que el animatrónico te atrape:\n\n🔤 ${mensaje}\n\n💡 Intentos restantes: *${intentos}*\n\n👣 Escribe una letra para comenzar... ¡si te atreves!`;
  conn.reply(m.chat, texto, m);
};

handler.before = async (m, { conn }) => {
  const juego = gam.get(m.sender);
  if (!juego) return;

  const { palabra, letrasAdivinadas } = juego;
  let intentos = juego.intentos;

  if (m.text.length === 1 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(m.text)) {
    const letra = m.text.toLowerCase();
    if (!letrasAdivinadas.includes(letra)) {
      letrasAdivinadas.push(letra);
      if (!palabra.includes(letra)) intentos--;
    }

    const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
    const resultado = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos);

    if (resultado.includes("¡LO LOGRASTE") || resultado.includes("¡AH NO! PERDISTE")) {
      conn.reply(m.chat, resultado, m);
    } else {
      gam.set(m.sender, { palabra, letrasAdivinadas, intentos });
      conn.reply(m.chat, `${resultado}\n\n🧠 Intentos restantes: *${intentos}*`, m);
    }
  } else {
    conn.reply(m.chat, "🔤 Ingresa *solo una letra válida*, niñ@ curioso. 👀", m);
  }
};

handler.help = ['ahorcado'];
handler.tags = ['game'];
handler.command = ['ahorcado'];
handler.group = true;
handler.register = true;

export default handler;
