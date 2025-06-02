let handler = async (m, { conn, text }) => {
  const consola = '📡'
  const advertencia = '⚠️'
  const aprobado = '✅'

  if (!text) {
    return m.reply(
      `${advertencia} *SISTEMA CENTRAL – FNaF LATAM*\n\n🚨 No se ha detectado ninguna frase para la entrada.\n\n📂 *Ejemplo correcto:*\n#setwelcome Bienvenido @user, has sido registrado por el sistema.\n\n🎮 Solo *administradores del recinto* pueden modificar este mensaje.`
    );
  }

  global.welcom1 = text.trim();

  m.reply(
    `${consola} *PROTOCOLO DE BIENVENIDA CONFIGURADO*\n\n${aprobado} El mensaje ha sido cargado con éxito en la cinta de bienvenida:\n\n📝 _${global.welcom1}_\n\n🎞️ *Reproductor automatizado listo para la próxima detección de ingreso.*`
  );
};

handler.help = ['setwelcome'];
handler.tags = ['grupo'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.botAdmin = true;

export default handler;
