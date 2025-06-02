// 🎥 DESCARGAS INSTAGRAM - FNaF LATAM Edition  
// Sistema de Seguridad Digital del Pizzaplex  
// Operador: @Fidel-Blop

import { igdl } from 'ruhend-scraper';

const handler = async (m, { args, conn }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `⚠️ *ALERTA DE SISTEMA*\n\n🔗 Necesito que ingreses un enlace válido de *Instagram* para iniciar la descarga.`, m);
  }

  try {
    await m.react('⏳') // Procesando...
    const res = await igdl(args[0]);
    const data = res.data;

    if (!data || data.length === 0) {
      return conn.reply(m.chat, `📡 *SISTEMA DE MONITOREO*\n\n❌ No se encontraron medios para descargar. Verifica el enlace.`, m);
    }

    for (let media of data) {
      await conn.sendFile(m.chat, media.url, 'instagram_media.mp4', `🎬 *DESCARGA COMPLETA*\n\nAquí tienes tu contenido de Instagram listo para disfrutar ฅ^•ﻌ•^ฅ.`, m);
    }

    await m.react('✅') // Éxito confirmado

  } catch (e) {
    console.error('[FNaF LATAM - INSTAGRAM ERROR]', e);
    await m.react('❌')
    return conn.reply(m.chat, `💀 *ERROR CRÍTICO*\nNo se pudo completar la descarga.\n🔍 Verifica el enlace o intenta nuevamente.`, m);
  }
};

handler.command = ['instagram', 'ig'];
handler.tags = ['descargas'];
handler.help = ['instagram', 'ig'];
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler;
