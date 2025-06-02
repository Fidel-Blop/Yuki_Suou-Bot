const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `🧸 *Error 404:* Necesito que menciones a alguien para iniciar el escaneo... ¡elige tu víctima!`, m);

  const porcentaje = Math.floor(Math.random() * 150);
  let emoji = '', mensaje = '';

  switch (command) {
    case 'gay':
      emoji = '🌈';
      mensaje = porcentaje < 50
        ? `🔍 *Escaneo completo:*\n${text.toUpperCase()} es *${porcentaje}% GAY* ${emoji}\n✦ ¡Demasiado Joto para ser ignorado!`
        : porcentaje > 100
        ? `⚠️ *Exceso detectado:*\n${text.toUpperCase()} es *${porcentaje}% GAY* ${emoji}\n✦ ¡Eso es más gay que bailar con glitter en el espacio!`
        : `✅ *Resultado oficial:*\n${text.toUpperCase()} es *${porcentaje}% GAY* ${emoji}\n✦ Confirmado por Freddy Fazbear.`;
      break;

    case 'lesbiana':
      emoji = '💖';
      mensaje = porcentaje < 50
        ? `👩‍❤️‍👩 *Diagnóstico en curso...*\n${text.toUpperCase()} es *${porcentaje}% LESBIANA* ${emoji}\n✦ Necesitas más tardes de Netflix y helado.`
        : porcentaje > 100
        ? `🔥 *¡Nivel extremo!*\n${text.toUpperCase()} es *${porcentaje}% LESBIANA* ${emoji}\n✦ ¡Rompiendo los medidores del sistema!`
        : `📊 *Análisis terminado:*\n${text.toUpperCase()} es *${porcentaje}% LESBIANA* ${emoji}\n✦ Tu aura brilla en rosa.`;
      break;

    case 'pajero':
    case 'pajera':
      emoji = '🖐️💦';
      mensaje = porcentaje < 50
        ? `📉 *Poca actividad detectada:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¿Todo bien en casa?`
        : porcentaje > 100
        ? `💀 *¡PELIGRO!*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Se te va a caer, bro!`
        : `✅ *Informe completado:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ Mente sana, mano ocupada.`;
      break;

    case 'puto':
    case 'puta':
      emoji = '🍑🔥';
      mensaje = porcentaje < 50
        ? `💫 *Exploración sexual mínima:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Hora de salir más seguido!`
        : porcentaje > 100
        ? `😈 *ULTRA MODO ACTIVADO:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Eres leyenda!`
        : `🌡️ *Resultado picante:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ Tu reputación habla por sí sola.`;
      break;

    case 'manco':
    case 'manca':
      emoji = '🎮💩';
      mensaje = porcentaje < 50
        ? `🕹️ *Análisis de habilidad:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Hay esperanza!`
        : porcentaje > 100
        ? `😵‍💫 *Manco nivel Freddy:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Por favor, no juegues ranked!`
        : `🎯 *Evaluación final:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡A seguir practicando en el Fazbear Arcade!`;
      break;

    case 'rata':
      emoji = '🧀🐀';
      mensaje = porcentaje < 50
        ? `🐾 *Escaneo de roñosidad:*\n${text.toUpperCase()} es *${porcentaje}% RATA* ${emoji}\n✦ Por ahora, tu alma está a salvo.`
        : porcentaje > 100
        ? `🚨 *Alerta de estafa:*\n${text.toUpperCase()} es *${porcentaje}% RATA* ${emoji}\n✦ ¡Ni Freddy roba tanto!`
        : `🪤 *Resultado ratonil:*\n${text.toUpperCase()} es *${porcentaje}% RATA* ${emoji}\n✦ El queso es tu pasión, ¿eh?`;
      break;

    case 'prostituto':
    case 'prostituta':
      emoji = '💋💄';
      mensaje = porcentaje < 50
        ? `🛏️ *Mercado bajo:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡A subir tarifas!`
        : porcentaje > 100
        ? `💎 *TOP DEL GREMIO:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Contrato directo con Freddy Fazbear's!`
        : `👠 *Evaluación profesional:*\n${text.toUpperCase()} es *${porcentaje}% ${command.toUpperCase()}* ${emoji}\n✦ ¡Tienes talento para los negocios!`;
      break;

    default:
      return m.reply(`📛 *Comando inválido, Nightguard.*`);
  }

  const frasesFinales = [
    "📡 Escaneo completado con éxito.",
    "🧪 Resultado verificado por la Afton Corp.",
    "🤖 Resultado validado por Freddy en persona."
  ];
  const resultadoFinal = `🎉 *CALCULADORA FNaF LATAM*

${mensaje}

${frasesFinales[Math.floor(Math.random() * frasesFinales.length)]}`;

  const loadingBar = [
    "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
    "《 ████▒▒▒▒▒▒▒▒》30%",
    "《 ███████▒▒▒▒▒》50%",
    "《 ██████████▒▒》80%",
    "《 ████████████》100%"
  ];

  const { key } = await conn.sendMessage(m.chat, {
    text: `🔄 Calculando...`,
    mentions: conn.parseMention(resultadoFinal)
  }, { quoted: m });

  for (let i = 0; i < loadingBar.length; i++) {
    await new Promise(res => setTimeout(res, 750));
    await conn.sendMessage(m.chat, {
      text: loadingBar[i],
      edit: key,
      mentions: conn.parseMention(resultadoFinal)
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    text: resultadoFinal,
    edit: key,
    mentions: conn.parseMention(resultadoFinal)
  }, { quoted: m });
};

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta'].map(v => v + ' <@usuario>');
handler.tags = ['fun'];
handler.command = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta'];
handler.group = true;
handler.register = true;

export default handler;
