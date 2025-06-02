const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {
    const emojiFnaf = '👹'; // algo creepy, estilo FNaF LATAM
    const loadingMsg = `${emojiFnaf} Buscando un oscuro y misterioso facto... No te desconectes, esto va a dar miedo.`;
    
    await conn.reply(m.chat, loadingMsg, m);
    
    let facto = pickRandom(global.factos);
    
    let message = 
`*┏━━━━┓*
┃ ${emojiFnaf}  *Dato aterrador*  ${emojiFnaf} ┃
*┗━━━┛*

*❥ "${facto}"*

*¿Te atreves a compartirlo?* 🖤🦇`;

    conn.reply(m.chat, message, m);
}

handler.help = ['facto'];
handler.tags = ['fun', 'fnaf'];
handler.command = ['facto', 'factos'];
handler.fail = null;
handler.exp = 5; // que dé más experiencia porque es cool
handler.group = true;
handler.register = true;

export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

global.factos = [
    "¿Sabías que en la oscuridad siempre hay alguien observando? No eres tan solo tú.",
    "Los animatrónicos no solo bailan, también vigilan tus movimientos.",
    "Cada noche en FNaF, un misterio más se suma a la leyenda.",
    "Si escuchas un crujido, no es el viento... es algo que no quiere que descubras.",
    "El lugar más seguro es aquel donde nadie entra... ni siquiera la muerte.",
    "Los fantasmas no pueden mentir, pero sí pueden jugar contigo.",
    "Dicen que cada vez que apagas la luz, una historia oscura comienza a contarse.",
    "Los datos que compartes pueden volverse en tu contra. Ten cuidado con lo que dices.",
    "El miedo es solo el primer paso para descubrir la verdad oculta.",
    "Un simple hecho puede convertirse en una pesadilla, si sabes dónde mirar.",
    "¿Crees que estás solo? Eso es justo lo que quieren que pienses.",
    "A veces, los hechos más aterradores están escondidos a plena vista.",
    "Si tus datos fueran un animatrónico, ¿qué tan peligroso sería?",
    "Cada secreto tiene un precio, y la verdad no siempre es gratis.",
    "Los archivos olvidados son los que guardan los horrores más grandes.",
    "El silencio es el peor ruido cuando estás atrapado en la oscuridad.",
    "Los errores no desaparecen, solo cambian de forma y esperan.",
    "Si una leyenda urbana te da miedo, imagina lo que no has visto aún.",
    "Los datos perdidos pueden regresar para cobrar su deuda.",
    "Nunca subestimes el poder de un dato escondido en las sombras.",
    "Lo que no se dice puede ser más terrorífico que lo que se grita.",
    "El próximo dato que leas puede cambiar tu destino... o terminarlo.",
    "Las sombras en las cámaras no siempre son fallos técnicos.",
    "Cada misterio tiene su guardián... y algunos son más letales que otros.",
    "El miedo es un dato que todos compartimos, pero pocos aceptan.",
    "En FNaF LATAM, los hechos no solo asustan, también te marcan para siempre.",
    "Recuerda, hasta los datos tienen secretos oscuros que nadie quiere contar.",
    "Cuando apagues tu dispositivo, alguien más puede estar encendiendo el suyo.",
    "La verdad puede doler, pero la ignorancia es peor.",
    "El dato que buscas podría estar justo detrás de ti... o bajo tu cama."
];
