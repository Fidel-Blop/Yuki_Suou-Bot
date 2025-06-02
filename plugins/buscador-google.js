import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text) {
    m.reply(`${emoji} *Falla en el sistema de Freddy Fazbear...* Necesito que indiques qué quieres buscar en Google.`);
    return;
  }

  const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.status) {
      m.reply('🛑 *Error crítico en los sistemas de búsqueda Fazbear...*');
      return;
    }

    let replyMessage = `🔎 *Resultados encontrados por el Buscador de FNaF LATAM* 🔍\n\n`;
    result.data.slice(0, 1).forEach((item, index) => {
      replyMessage += `📂 *${index + 1}. ${item.title}*\n`;
      replyMessage += `📃 ${item.description}\n`;
      replyMessage += `🔗 ${item.url}`;
    });

    m.react('✅');
    m.reply(replyMessage);

  } catch (error) {
    console.error(`${msm} ⚠️ Error técnico en los archivos del sistema Fazbear:`, error);
    m.reply(`${msm} Algo salió mal al buscar... El sistema está inestable. 🔧`);
  }
};

handler.command = ['google'];
handler.help = ['google <consulta>'];
handler.tags = ['search'];

export default handler;
