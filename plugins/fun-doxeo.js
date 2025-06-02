import { performance } from 'perf_hooks';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

var handler = async (m, { conn, text }) => {
    let who, userName;

    if (m.isGroup) {
        if (m.mentionedJid.length > 0) {
            who = m.mentionedJid[0];
            userName = await conn.getName(who);
        } else if (m.quoted) {
            who = m.quoted.sender;
            userName = await conn.getName(who);
        } else {
            who = m.chat;
        }
    } else {
        who = m.chat;
    }

    if (!who) return conn.reply(m.chat, '⚠️ Necesito que etiquetes o respondas a alguien para rastrear su señal 👾', m);
    if (!userName) userName = text || 'Sujeto Desconocido';

    const status = [
        '*🔍 Localizando conexión...',
        '*📡 Rastreando IP interna...',
        '*💀 Accediendo al puerto 443...',
        '*📁 Analizando metadatos...',
        '*👤 Perfil encontrado...*'
    ];

    const boost = [
        '*0%*','*12%*','*27%*','*39%*','*58%*',
        '*67%*','*73%*','*88%*','*96%*','*100%*'
    ];

    const { key } = await conn.sendMessage(m.chat, { text: '📡 *Iniciando protocolo FNaF-DOX*...' }, { quoted: m });
    for (let i = 0; i < status.length; i++) {
        await delay(1000);
        await conn.sendMessage(m.chat, { text: `${status[i]}\nProgreso: ${boost[i]}`, edit: key });
    }

    let t1 = performance.now();
    let t2 = performance.now();
    let velocidad = (t2 - t1).toFixed(2);

    let result = `🎮 *FNaF LATAM | Dox Completo*

📦 [ DATOS ADQUIRIDOS ] 📦
━━━━━━━━━━━━━━━━━━━━━
👤 *Objetivo:* ${userName}
🌐 *IP:* 198.51.100.${Math.floor(Math.random()*255)}
🛰️ *Servidor Proxy:* Freddy-Net v4.1
🔍 *Ubicación Estimada:* Basement, Freddy Fazbear’s Pizza
📡 *MAC (spoofed):* 00:1B:44:11:3A:B7
💾 *S.O. Detectado:* Windows Fazbear Edition
💻 *Navegador:* Tor Browser (versión modificada)
🌍 *ISP:* Fazbear Wireless Communications
🎭 *VPN:* GlitchyGhostVPN
🎮 *Dispositivo:* FazCam XT-02
📶 *Tipo de Red:* Ethernet Poseída
🕷️ *Amenaza detectada:* Shadow Bonnie sniffing packets
🕒 *Ping en red:* ${Math.floor(Math.random() * 200)} ms
⚠️ *Velocidad de escaneo:* ${velocidad} ms
📁 *Archivos expuestos:* system32\\fazcam_config.dll
🔐 *Puertos abiertos:* 666, 1987, 1983
🦾 *Sistema anti-rastreo:* ACTIVADO (bypass exitoso)
🛑 *Firewall:* Desactivado por Springtrap.exe
🌑 *Ultimo acceso:* 03:00 AM
━━━━━━━━━━━━━━━━━━━━━
👁️ *Observación:* Sujeto vinculado a la *Zona Segura #7* de la Pizzería. Precaución al interactuar.
📸 *Camara de vigilancia activada.* Posible interferencia de *Marionette*.
`;

    m.reply(result, null, { mentions: conn.parseMention(result) });
}

handler.help = ['doxear'];
handler.tags = ['fun'];
handler.command = ['doxear', 'doxxeo', 'doxeo'];
handler.register = true;
handler.group = true;

export default handler;
