// 📦 DESCARGAS MOD APK - FNaF LATAM Edition
// Subsistema de Instalación Controlada - Pizzaplex Digital Core

import { search, download } from 'aptoide-scraper';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat, `⚠️ *ENTRADA REQUERIDA*\n\n🔎 Por favor, especifica el nombre de la APK que deseas rastrear.`, m);
  }

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } }); // Iniciando rastreo...

  try {
    conn.reply(m.chat, `⏳ *SISTEMA EN PROCESO*\n\n📡 Buscando y preparando la descarga segura de tu archivo...`, m);
    let resultado = await search(text);
    let apk = await download(resultado[0].id);

    let info = `🧩 *MÓDULO DE APLICACIONES MODIFICADAS*\n\n` +
               `📱 *Nombre:* ${apk.name}\n` +
               `📦 *Paquete:* ${apk.package}\n` +
               `🛠 *Última Actualización:* ${apk.lastup}\n` +
               `⚖ *Tamaño:* ${apk.size}\n\n` +
               `📥 *FNaF LATAM - Unidad de Entrega Automatizada*`;

    await conn.sendFile(m.chat, apk.icon, 'apk-thumbnail.jpg', info, m);
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    if (apk.size.includes('GB') || parseFloat(apk.size.replace(' MB', '')) > 999) {
      return conn.reply(m.chat, `📛 *ERROR DE TAMAÑO EXCEDIDO*\n\nEl archivo solicitado supera el límite permitido para envío directo.`, m);
    }

    await conn.sendMessage(
      m.chat,
      {
        document: { url: apk.dllink },
        mimetype: 'application/vnd.android.package-archive',
        fileName: `${apk.name}.apk`,
        caption: `🔓 *Descarga Completada: ${apk.name}*\n🎮 *Instálala bajo tu responsabilidad.*`
      },
      { quoted: m }
    );

  } catch (e) {
    console.error('[FNaF LATAM - MODAPK ERROR]', e);
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    return conn.reply(m.chat, `💥 *ERROR EN EL PROCESO*\n\nNo se pudo completar la operación. Inténtalo más tarde o verifica el nombre de la aplicación.`, m);
  }
};

handler.tags = ['descargas'];
handler.help = ['apkmod'];
handler.command = ['apk', 'modapk', 'aptoide'];
handler.group = true;
handler.register = true;
handler.coin = 5;

export default handler;
