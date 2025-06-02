/*
✧ FNaF LATAM - Buscador de TikTok
• Adaptado por Fidel-Blop
*/

import axios from 'axios';
const {
  proto,
  generateWAMessageFromContent,
  generateWAMessageContent
} = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, '📱 *Escribe el nombre o palabra clave para buscar en TikTok.*', m);
  }

  await m.react('🔍');

  const notificar = () =>
    conn.reply(m.chat, '🎵 *Buscando videos de TikTok...*', m, {
      contextInfo: {
        externalAdReply: {
          mediaUrl: null,
          mediaType: 1,
          showAdAttribution: true,
          title: '✧ TIKTOK SEARCH ✧',
          body: dev,
          previewType: 0,
          thumbnail: avatar,
          sourceUrl: redes
        }
      }
    });

  const crearVideo = async (url) => {
    const { videoMessage } = await generateWAMessageContent({
      video: { url }
    }, { upload: conn.waUploadToServer });
    return videoMessage;
  };

  const mezclar = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  try {
    await notificar();

    const { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(text)}`);
    let resultados = data.data;
    mezclar(resultados);
    let top = resultados.slice(0, 7);

    const tarjetas = [];

    for (let vid of top) {
      tarjetas.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: dev }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: vid.title || 'Sin título',
          hasMediaAttachment: true,
          videoMessage: await crearVideo(vid.nowm)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      });
    }

    const msgFinal = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🎬 *Resultados de:* ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: dev
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: tarjetas
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msgFinal.message, { messageId: msgFinal.key.id });
    await m.react('✅');
  } catch (e) {
    console.error(e);
    await m.react('❌');
    return conn.reply(m.chat, `⚠︎ *Ocurrió un error inesperado:* ${e.message}`, m);
  }
};

handler.help = ['tiktoksearch <consulta>'];
handler.tags = ['buscador'];
handler.command = ['tiktoksearch', 'ttss', 'tiktoks'];
handler.register = true;
handler.group = true;

export default handler;
