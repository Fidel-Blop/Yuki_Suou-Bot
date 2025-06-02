var handler = async (m, { conn, command, text }) => {
  const emoji = '🖤';
  const emoji2 = '💀';
  const rwait = '⌛';
  const done = '✅';

  if (!text) {
    await m.react('❌');
    return conn.reply(m.chat, `${emoji} *Debes escribir tu nombre y el nombre de la otra persona para calcular su nivel de amor oscuro...*`, m);
  }

  let [name1, ...rest] = text.split(' ');
  let name2 = rest.join(' ');

  if (!name2) {
    await m.react('❓');
    return conn.reply(m.chat, `${emoji2} *No olvides poner el nombre de la segunda persona para que el destino los una o los separe...*`, m);
  }

  await m.react(rwait);
  await conn.reply(m.chat, `${emoji} Calculando la compatibilidad en el inframundo...`, m);
  await new Promise(r => setTimeout(r, 1500));

  let lovePercent = Math.floor(Math.random() * 101);
  let loveMessage = '';

  if (lovePercent > 80) {
    loveMessage = '🔥 Su amor es una llama que ni la oscuridad puede apagar.';
  } else if (lovePercent > 50) {
    loveMessage = '💫 Hay magia en esta conexión, pero no todo está escrito.';
  } else if (lovePercent > 20) {
    loveMessage = '🌑 El destino duda, pero aún queda esperanza en las sombras.';
  } else {
    loveMessage = '🕸️ Tal vez sus almas estén destinadas a caminar separadas en la oscuridad.';
  }

  const reply = `💀 *FNaF LATAM - Calculadora de Amor Oscuro* 💀

❤️ *${name1}* y *${name2}* tienen una compatibilidad de: *${lovePercent}%* ❤️

${loveMessage}

*Que el destino decida...*`;

  await m.reply(reply, null, { mentions: conn.parseMention(reply) });
  await m.react(done);
}

handler.help = ['ship', 'love'];
handler.tags = ['fun'];
handler.command = ['ship','pareja'];
handler.group = true;
handler.register = true;

export default handler;
