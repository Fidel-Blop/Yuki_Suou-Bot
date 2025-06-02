const toM = (a) => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  const ps = groupMetadata.participants.map(v => v.id);

  if (ps.length < 2) {
    return m.reply('Este lugar está demasiado vacío... No hay suficientes almas para formar una pareja oscura. 👻');
  }

  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);

  const parejasFnaf = [
    "una dupla letal que podría sobrevivir a cualquier pesadilla.",
    "la pareja que hará temblar hasta a los animatrónicos.",
    "un dúo destinado a compartir secretos en la oscuridad.",
    "una unión marcada por el misterio y el terror.",
    "dos almas unidas por la noche eterna de FNaF LATAM.",
    "los futuros reyes del miedo y el amor macabro.",
    "un vínculo tan fuerte como los cables eléctricos en la pizzería.",
  ];

  const elegido = parejasFnaf[Math.floor(Math.random() * parejasFnaf.length)];

  m.reply(`*${toM(a)}*... 💀\n\nHas sido seleccionado para casarte 💍 con *${toM(b)}*,\n\nJuntos serán ${elegido}\n\n¿Listos para enfrentar la oscuridad de la noche? 🌙🦇`, null, {
    mentions: [a, b],
  });
}

handler.help = ['formarpareja'];
handler.tags = ['fun', 'fnaf'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
handler.register = true;

export default handler;
