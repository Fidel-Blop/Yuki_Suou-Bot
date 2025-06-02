const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn }) => {
  const frasesFnafLatam = global.frases_fnaf_latam;
  const frase = pickRandom(frasesFnafLatam);

  await conn.reply(m.chat, '🔍 Buscando en los archivos malditos... espere unos segundos. 📂👁️', m);

  await conn.reply(
    m.chat,
    `*🎭 Frase desde la oscuridad de FNaF LATAM:*\n\n➤ ❝ *${frase}* ❞\n\n🎮 ¿Será una pista... o solo una advertencia? 👀`,
    m
  );
};

handler.help = ['frase'];
handler.tags = ['fun', 'fnaf'];
handler.command = ['frase', 'frases'];
handler.fail = null;
handler.exp = 0;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.frases_fnaf_latam = [
  "A veces, el silencio en la pizzería dice más que mil gritos.",
  "No todos los que brillan están vivos.",
  "Ser valiente no significa no tener miedo... sino avanzar con él.",
  "Detrás de cada máscara, hay un alma rota.",
  "Los animatrónicos no descansan... y tú tampoco deberías.",
  "Recuerda... no estás solo en esta sala.",
  "La oscuridad es hogar para los que saben observar.",
  "El tiempo avanza... y ellos también.",
  "La noche es larga, pero tu cordura es corta.",
  "Las cámaras no capturan lo que no quiere ser visto.",
  "Respira hondo... puede ser la última vez.",
  "La puerta no siempre te protegerá.",
  "¿Y si el monstruo siempre fuiste tú?",
  "Ellos te observan... incluso cuando crees que dormitan.",
  "Cinco noches parecen poco... hasta que las vives.",
  "Entre risas metálicas, se esconde la tragedia.",
  "Los turnos nocturnos revelan más que lo que ocultan.",
  "Te advertimos... pero decidiste aceptar el trabajo.",
  "A veces el horror no es paranormal... es mecánico.",
  "La pizzería guarda secretos que no deben contarse.",
  "Ellos recuerdan... incluso si tú no lo haces.",
  "Cada movimiento tuyo es una nota más en su sinfonía del miedo.",
  "Escucha atentamente... ¿lo oyes caminar?",
  "La muerte aquí no siempre es el final.",
  "No es un juego... es una maldición con música de fondo.",
];
