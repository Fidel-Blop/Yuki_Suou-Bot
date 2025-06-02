let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply(
      '🛑 *Sistema de Gestión - FNaF LATAM*\n\n⚠️ No se detectó ninguna frase.\n\n📌 Usa:\n#setwelcome Bienvenido, user, a Freddy Fazbear\'s Pizzería.\n\n🔒 Solo administradores autorizados pueden cambiar el mensaje de bienvenida.'
    );
  }

  global.welcom1 = text.trim();

  m.reply(
    `✅ *Actualización completada*\n\n📂 Mensaje de bienvenida establecido como:\n\n「 ${global.welcom1} 」\n\n🎮 *Sistema de Entrada Automatizada – FNaF LATAM*`
  );
};

handler.help = ['setwelcome'];
handler.tags = ['grupo'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
