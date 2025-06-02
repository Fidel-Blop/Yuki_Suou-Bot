let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
╭─〔 🎮 *FNaF LATAM BOT* 🎮 〕─╮
│🔻 *Usuario conectado:* @${userId.split('@')[0]}
│🔻 *Modo actual:* Público
│🔻 *Unidad:* ${(conn.user.jid == global.conn.user.jid ? 'Mainframe 🅥' : 'Secundaria 🅑')}
│🔻 *Tiempo activo:* ${uptime}
│🔻 *Animatrónicos registrados:* ${totalreg}
│🔻 *Sistemas operativos:* ${totalCommands}
╰───────────────────────────╯

Bienvenido a la interfaz de *Fazbear Systems v1.0*. 
Explora comandos y sobrevive la noche. 
*#menu | #help* para no perderte en la pizzería.

🛠️ 〔 INFO CENTRAL 〕
• #infobot → Datos del sistema FreddyBot
• #status → Estado general del servidor
• #creador → Contacta con el vigilante nocturno
• #uptime → Tiempo que llevamos activos (sin ser desactivados 👀)
• #ping → Verifica la latencia del sistema
• #sc → Script oficial de FNaF LATAM Bot
• #serbot → Crea tu Sub-Bot estilo Freddy Fazbear's Network
• #sockets → Lista de sub-bots activos
• #staff → Técnicos responsables del sistema
• #reportar → Reporta anomalías al panel central
• #system → Estado de recursos y potencia

🔎 〔 SISTEMA DE BÚSQUEDA 〕
• #ytsearch → Buscar en YouTube
• #google → Consultas rápidas
• #pinterest → Imágenes estéticas y conceptuales
• #imagen → Búsqueda visual general
• #githubsearch → Códigos en las sombras
• #infoanime → Info de animetrónicos no identificados
• #cuevana → Películas (fuera de horario laboral, claro)
• #npmjs → Bibliotecas útiles del servidor

📥 〔 DESCARGAS DE ARTEFACTOS 〕
• #tiktok → Extrae videos estilo VHS
• #mediafire → Descarga archivos ocultos
• #mega → Archivos desde bóvedas digitales
• #play → Música para ambientar la pizzería
• #ytmp3 / #ytmp4 → Extracción directa de contenido
• #fb / #x / #ig → Redes sociales bajo vigilancia
• #apk → Aplicaciones desde el sótano de Afton
• #gitclone → Clonar software desde GitHub

💰 〔 ECONOMÍA FREDDY COINS 💰〕
• #trabajar → Realiza turnos para ganar 🪙
• #crime → Comete pequeños fallos en el sistema
• #cf / #ruleta / #casino → Apuestas peligrosas
• #cartera → Tu saldo FreddyCoin
• #banco → Depósitos nocturnos
• #deposit / #withdraw → Transacciones bancarias
• #transfer → Enviar recursos entre usuarios
• #minar / #aventura → Explora y consigue recompensas
• #daily / #weekly / #monthly → Bonificaciones por asistencia
• #slot → Prueba suerte en el sistema aleatorio
• #cofre → Recompensas aleatorias diarias
• #eboard → Ranking de vigilantes
• #steal / #robarxp → Riesgos al sistema de otros

🛡️ 〔 SISTEMAS DE SEGURIDAD 〕
• #ban / #unban → Control de acceso a zonas restringidas
• #editautoresponder → Configura respuestas del asistente IA
• #ds → Limpieza del sistema
• #fixmsgespera → Elimina residuos de sesiones
• #sug → Sugiere mejoras al centro de control

🎭 *"Recuerda vigilar las cámaras... Nunca sabes cuándo te observarán de vuelta."*  
╰── Fazbear LATAM Systems - Noche segura, usuario.
`.trim()

    conn.sendMessage(m.chat, { text: txt, mentions: [userId] })
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help']
export default handler
