import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  const emoji = '🎮';
  const emoji2 = '📡';
  const success = '✅';
  const error = '❌';
  const rwait = '⌛';
  const done = '✅';

  if (!text) {
    await m.react(error);
    return conn.reply(m.chat, `${emoji} *ERROR:* Debes ingresar el nombre del Pokémon que deseas buscar.`, m);
  }

  await m.react(rwait);
  await conn.reply(m.chat, `${emoji2} *Escaneando la base de datos de la Pokedex...*\n🔍 Buscando *"${text}"*, espere un momento...`, m);

  try {
    const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Pokémon no encontrado');

    const json = await response.json();
    const nombre = json.name.toLowerCase();
    const imagen = `https://img.pokemondb.net/artwork/${nombre}.jpg`;

    const aipokedex = `
*╭───⌈ 𖤐 𝗗𝗔𝗧𝗢𝗦 𝗣𝗢𝗞𝗘𝗗𝗘𝗫 ✦⌋───╮*

🧬 *Nombre:* ${json.name}
🆔 *ID:* ${json.id}
🔮 *Tipo:* ${json.type}
⚡ *Habilidades:* ${json.abilities}
📏 *Tamaño:* ${json.height}
⚖️ *Peso:* ${json.weight}

📖 *Descripción:*
${json.description}

🔗 *Más info:* https://www.pokemon.com/es/pokedex/${nombre}

*╰──⌈ FNaF LATAM BOT ⌋──╯*`;

    await conn.sendFile(m.chat, imagen, 'pokedex.jpg', aipokedex.trim(), m);
    await m.react(done);
  } catch (e) {
    await m.react(error);
    return conn.reply(m.chat, `${error} *Error:* No se encontró el Pokémon *"${text}"* en la base de datos.`, m);
  }
};

handler.help = ['pokedex *<pokemon>*'];
handler.tags = ['fun'];
handler.command = ['pokedex'];
handler.group = true;
handler.register = true;

export default handler;
