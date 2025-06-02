const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default;

var handler = async (m, { conn }) => {
  const fnafEmoji = '🧸🔧💡';
  const loadingMsg = `${fnafEmoji} *Buscando el mejor chiste del universo animatrónico...* 🔍\n\n⏳ *Prepárate para reír... o llorar de lo malo que es.*`;
  
  await conn.reply(m.chat, loadingMsg, m);

  const chisteSeleccionado = pickRandom(global.chiste);

  const resultado = `
*╭─❖ 「 𝐅𝐍𝐀𝐅 𝐋𝐀𝐓𝐀𝐌 - 𝐂𝐇𝐈𝐒𝐓𝐄 」 ❖─╮*
🎤 *${chisteSeleccionado}*
*╰─❖ 𝑱𝒂𝒋𝒂... ¿te reíste o lloraste? ❖─╯*
`;

  await conn.reply(m.chat, resultado, m);
};

handler.help = ['chiste'];
handler.tags = ['fun'];
handler.command = ['chiste'];
handler.fail = null;
handler.exp = 3;
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.chiste = [
  "¿Cuál es el último animal que subió al arca de Noé? El del-fin..",
  "¿Cómo se dice pañuelo en japonés? Saka-moko",
  "¿Cómo se dice disparo en árabe? Ahí-va-la-bala..",
  "¿Qué le dice un gusano a otro gusano? Voy a dar una vuelta a la manzana.",
  "Un gato empieza a ladrar en el tejado. Otro gato le dice: ¿por qué ladras? —Estoy aprendiendo idiomas.",
  "Doctor: respire profundo. —¿A quién va a ocultar doctor si no le debo nada?",
  "¿Qué hace tu mamá? —Nada. ¿Y la tuya? —Nada también. (Son peces 🐟)",
  "¿Cuál es el colmo de Aladdín? Tener mal genio.",
  "Profesor: Tu trabajo me conmovió. Alumno: ¿por qué? —Me dio mucha pena.",
  "Mamá, no quiero jugar más con Pedrito. —¿Por qué? —Porque cuando le pego con un taco de madera llora.",
  "Juanito, ¿qué harías si te ahogas? —Llorar para desahogarme.",
  "Mamá, me siento gorda, fea y vieja. —Tienes toda la razón.",
  "¿Cómo se dice pelo sucio en chino? Chin cham pu.",
  "Un niño tan despistado que... se me olvidó el chiste.",
  "¿Qué tal va la vida de casada? —No me puedo quejar, mi marido está al lado.",
  "¿Por qué las focas miran hacia arriba? Porque ahí están los focos.",
  "Camarero, este filete tiene nervios. —Normal, es su primera vez.",
  "¿Cómo se llama el primo de Bruce Lee? Broco Lee.",
  "Una madre: me dijo un pajarito que te drogas. —La drogada eres tú, que hablas con pajaritos."
];
