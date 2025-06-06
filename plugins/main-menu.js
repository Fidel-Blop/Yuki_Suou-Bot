let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
¡Bienvenido seas a la Central Comandos de *FNaF LATAM Bot* 👾🤖!

╭┈ ↷
│ 👤 Cliente » @${userId.split('@')[0]}
│🎮 Modo » Publico
│🤖 Bot » ${(conn.user.jid == global.conn.user.jid ? 'Principal 🅥' : 'Prem Bot 🅑')}
│🔌 Activado » ${uptime}
│🧟‍♂️ Usuarios » ${totalreg}
│📜 Comandos » ${totalCommands}
│🦾 Baileys » Multi Device
╰─────────────────

🤖 Inspirado en la comunidad FNaF LATAM, este bot fue creado con 💥 PASIÓN y ENERGÍA 💥 para que TODOS los miembros de la comunidad puedan disfrutarlo al máximo.

🎮 Comandos, diversión, utilidad y mucho más… ¡Todo en un solo bot!
🌟 ¡Porque acá en FNaF LATAM, la energía no se apaga nunca!

🔍 『𝘔𝘰𝘥𝘰 𝘋𝘦𝘵𝘦𝘤𝘵𝘪𝘷𝘦 — 𝘉𝘶𝘴𝘤𝘢𝘥𝘰𝘳 𝘈𝘯𝘪𝘮𝘢𝘵𝘳ó𝘯𝘪𝘤𝘰』

⫸ `•˚⊹:･ﾟ• ¡Explora la red como si tuvieras visión nocturna! 🌐🔦📡
ᰔᩚ *#tiktoksearch • #tiktoks*
> ✦ Buscador de videos de tiktok.
ᰔᩚ *#tweetposts*
> ✦ Buscador de posts de Twitter/X.
ᰔᩚ *#ytsearch • #yts*
> ✦ Realiza búsquedas de Youtube.
ᰔᩚ *#githubsearch*
> ✦ Buscador de usuarios de GitHub.
ᰔᩚ *#cuevana • #cuevanasearch*
> ✦ Buscador de películas/series por Cuevana.
ᰔᩚ *#google*
> ✦ Realiza búsquedas por Google.
ᰔᩚ *#pin • #pinterest*
> ✦ Buscador de imagenes de Pinterest.
ᰔᩚ *#imagen • #image*
> ✦ buscador de imagenes de Google.
ᰔᩚ *#infoanime*
> ✦ Buscador de información de anime/manga.

📂 『𝘔𝘰𝘥𝘰 𝘚𝘦𝘤𝘶𝘦𝘯𝘤𝘪𝘢 — 𝘋𝘦𝘴𝘤𝘢𝘳𝘨𝘢𝘴 𝘔𝘶𝘭𝘵𝘪𝘱𝘭𝘦𝘴』

⫸ `•˚⊹:･ﾟ• Archivos listos para ser liberados desde la pizzería... ¡todos de una! 💾�
ᰔᩚ *#tiktok • #tt*
> ✦ Descarga videos de TikTok.
ᰔᩚ *#mediafire • #mf*
> ✦ Descargar un archivo de MediaFire.
ᰔᩚ *#pinvid • #pinvideo* + [enlacé]
> ✦ Descargar vídeos de Pinterest. 
ᰔᩚ *#mega • #mg* + [enlacé]
> ✦ Descargar un archivo de MEGA.
ᰔᩚ *#play • #play2*
> ✦ Descarga música/video de YouTube.
ᰔᩚ *#ytmp3 • #ytmp4*
> ✦ Descarga música/video de YouTube mediante url.
ᰔᩚ *#fb • #facebook*
> ✦ Descarga videos de Facebook.
ᰔᩚ *#twitter • #x* + [Link]
> ✦ Descargar un video de Twitter/X
ᰔᩚ *#ig • #instagram*
> ✦ Descarga contenido de Instagram.
ᰔᩚ *#tts • #tiktoks* + [busqueda]
> ✦ Buscar videos de tiktok 
ᰔᩚ *#terabox • #tb* + [enlace]
> ✦ Descargar archivos por Terabox.
ᰔᩚ *#ttimg • #ttmp3* + <url>
> ✦ Descarga fotos/audios de tiktok. 
ᰔᩚ *#apk • #modapk*
> ✦ Descarga un apk de Aptoide.

💰 『𝘚𝘪𝘴𝘵𝘦𝘮𝘢 𝘋𝘦 𝘛𝘪𝘦𝘯𝘥𝘢 — 𝘌𝘤𝘰𝘯𝘰𝘮í𝘢 𝘈𝘯𝘪𝘮𝘢𝘵𝘳ó𝘯𝘪𝘤𝘢』

⫸ `•˚⊹:･ﾟ• ¡Ganá monedas, recursos y subí de nivel como un verdadero guardia de élite! 🪙📦🎮
ᰔᩚ *#w • #work • #trabajar*
> ✦ Trabaja para ganar ¥enes.
ᰔᩚ *#slut • #protituirse*
> ✦ Trabaja como prostituta y gana ¥enes.
ᰔᩚ *#cf • #suerte*
> ✦ Apuesta tus ¥enes a cara o cruz.
ᰔᩚ *#crime • #crimen
> ✦ Trabaja como ladrón para ganar ¥enes.
ᰔᩚ *#ruleta • #roulette • #rt*
> ✦ Apuesta ¥enes al color rojo o negro.
ᰔᩚ *#casino • #apostar*
> ✦ Apuesta tus ¥enes en el casino.
ᰔᩚ *#slut*
> ✦ Apuesta tus ¥enes en la ruleta y prueba tu suerte.
ᰔᩚ *#cartera • #wallet*
> ✦ Ver tus ¥enes en la cartera.
ᰔᩚ *#banco • #bank*
> ✦ Ver tus ¥enes en el banco.
ᰔᩚ *#deposit • #depositar 
> ✦ Deposita tus ¥enes al banco.
ᰔᩚ *#with • #retirar • #withdraw*
> ✦ Retira tus ¥enes del banco.
ᰔᩚ *#transfer • #pay*
> ✦ Transfiere ¥enes o XP a otros usuarios.
ᰔᩚ *#miming • #minar • #mine*
> ✦ Trabaja como minero y recolecta recursos.
ᰔᩚ *#buyall • #buy*
> ✦ Compra ¥enes con tu XP.
ᰔᩚ *#daily • #diario*
> ✦ Reclama tu recompensa diaria.
ᰔᩚ *#cofre*
> ✦ Reclama un cofre diario lleno de recursos.
ᰔᩚ *#weekly • #semanal*
> ✦ Reclama tu regalo semanal.
ᰔᩚ *#monthly • #mensual*
> ✦ Reclama tu recompensa mensual.
ᰔᩚ *#steal • #robar • #rob*
> ✦ Intenta robarle ¥enes a alguien.
ᰔᩚ *#robarxp • #robxp*
> ✦ Intenta robar XP a un usuario.
ᰔᩚ *#eboard • #baltop*
> ✦ Ver el ranking de usuarios con más ¥enes.
ᰔᩚ *#aventura • #adventure*
> ✦ Aventúrate en un nuevo reino y recolecta recursos.
ᰔᩚ *#curar • #heal*
> ✦ Cura tu salud para volverte aventurar.
ᰔᩚ *#cazar • #hunt • #berburu*
> ✦ Aventúrate en una caza de animales.
ᰔᩚ *#inv • #inventario*
> ✦ Ver tu inventario con todos tus ítems.
ᰔᩚ *#mazmorra • #explorar*
> ✦ Explorar mazmorras para ganar ¥enes.
ᰔᩚ *#halloween*
> ✦ Reclama tu dulce o truco (Solo en Halloween).
ᰔᩚ *#christmas • #navidad*
> ✦ Reclama tu regalo navideño (Solo en Navidad).

🎨 『𝘊𝘢𝘮𝘢𝘳𝘢 𝘋𝘦 𝘚𝘦𝘨𝘶𝘳𝘪𝘥𝘢𝘥 — 𝘌𝘥𝘪𝘤𝘪ó𝘯 & 𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘴』
    
❍ `•˚⊹:･ﾟ• ¡Crea tus propios stickers, memes y más! 📸🎭✨
ᰔᩚ *#sticker • #s*
> ✦ Crea stickers de (imagen/video)
ᰔᩚ *#setmeta*
> ✦ Estable un pack y autor para los stickers.
ᰔᩚ *#delmeta*
> ✦ Elimina tu pack de stickers.
ᰔᩚ *#pfp • #getpic*
> ✦ Obtén la foto de perfil de un usuario.
ᰔᩚ *#qc*
> ✦ Crea stickers con texto o de un usuario.
ᰔᩚ *#toimg • #img*
> ✦ Convierte stickers en imagen.
ᰔᩚ *#brat • #ttp • #attp*︎ 
> ✦ Crea stickers con texto.
ᰔᩚ *#emojimix*
> ✦ Fuciona 2 emojis para crear un sticker.
ᰔᩚ *#wm*
> ✦ Cambia el nombre de los stickers.

🔧 『𝘛𝘢𝘭𝘭𝘦𝘳 𝘋𝘦 𝘍𝘳𝘦𝘥𝘥𝘺 — 𝘏𝘦𝘳𝘳𝘢𝘮𝘪𝘦𝘯𝘵𝘢𝘴 & 𝘛𝘳𝘶𝘤𝘰𝘴』

❍ `•˚⊹:･ﾟ• ¡Funciones útiles para todo tipo de tareas! 🛠️💡📂
ᰔᩚ *#calcular • #calcular • #cal*
> ✦ Calcular todo tipo de ecuaciones.
ᰔᩚ *#tiempo • #clima*
> ✦ Ver el clima de un pais.
ᰔᩚ *#horario*
> ✦ Ver el horario global de los países.
ᰔᩚ *#fake • #fakereply*
> ✦ Crea un mensaje falso de un usuario.
ᰔᩚ *#enhance • #remini • #hd*
> ✦ Mejora la calidad de una imagen.
ᰔᩚ *#letra*
> ✦ Cambia la fuente de las letras.
ᰔᩚ *#read • #readviewonce • #ver*
> ✦ Ver imágenes de una sola vista.
ᰔᩚ *#whatmusic • #shazam*
> ✦ Descubre el nombre de canciones o vídeos.
ᰔᩚ *#ss • #ssweb*
> ✦ Ver el estado de una página web.
ᰔᩚ *#length • #tamaño*
> ✦ Cambia el tamaño de imágenes y vídeos.
ᰔᩚ *#say • #decir* + [texto]
> ✦ Repetir un mensaje.
ᰔᩚ *#todoc • #toducument*
> ✦ Crea documentos de (audio, imágenes y vídeos).
ᰔᩚ *#translate • #traducir • #trad*
> ✦ Traduce palabras en otros idiomas.

👤 『𝘉𝘪𝘦𝘯𝘦𝘯𝘪𝘥𝘰 𝘢 𝘭𝘰𝘴 𝘙𝘦𝘵𝘳𝘰𝘤𝘰𝘳𝘵𝘪𝘯𝘢𝘴 — 𝘗𝘳𝘰𝘧𝘪𝘭𝘦𝘴 & 𝘌𝘴𝘵𝘢𝘥𝘰𝘴』
    
❍ `•˚⊹:･ﾟ• Controlá y personalizá tu identidad en la comunidad 🎭🕹️✨
ᰔᩚ *#reg • #verificar • #register*
> ✦ Registra tu nombre y edad en el bot.
ᰔᩚ *#unreg*
> ✦ Elimina tu registro del bot.
ᰔᩚ *#profile*
> ✦ Muestra tu perfil de usuario.
ᰔᩚ *#marry* [mension / etiquetar]
> ✦ Propón matrimonio a otro usuario.
ᰔᩚ *#divorce*
> ✦ Divorciarte de tu pareja.
ᰔᩚ *#setgenre • #setgenero*
> ✦ Establece tu género en el perfil del bot.
ᰔᩚ *#delgenre • #delgenero*
> ✦ Elimina tu género del perfil del bot.
ᰔᩚ *#setbirth • #setnacimiento*
> ✦ Establece tu fecha de nacimiento en el perfil del bot.
ᰔᩚ *#delbirth • #delnacimiento*
> ✦ Elimina tu fecha de nacimiento del perfil del bot.
ᰔᩚ *#setdescription • #setdesc*
> ✦ Establece una descripción en tu perfil del bot.
ᰔᩚ *#deldescription • #deldesc*
> ✦ Elimina la descripción de tu perfil del bot.
ᰔᩚ *#lb • #lboard* + <Paginá>
> ✦ Top de usuarios con más (experiencia y nivel).
ᰔᩚ *#level • #lvl* + <@Mencion>
> ✦ Ver tu nivel y experiencia actual.
ᰔᩚ *#comprarpremium • #premium*
> ✦ Compra un pase premium para usar el bot sin límites.
ᰔᩚ *#confesiones • #confesar*
> ✦ Confiesa tus sentimientos a alguien de manera anonima.

👥 『𝘊𝘰𝘯𝘵𝘳𝘰𝘭 𝘥𝘦 𝘓𝘰𝘴 𝘉𝘢𝘴𝘵𝘪𝘰𝘯𝘦𝘴 — 𝙂𝘳𝘶𝘱𝘰𝘴 & 𝘈𝘥𝘮𝘪𝘯𝘪𝘴𝘵𝘳𝘢𝘤𝘪ó𝘯』

❍ `•˚⊹:･ﾟ• Manejá y dominá tus grupos con poder y orden 🛡️📲⚙️
ᰔᩚ *#hidetag*
> ✦ Envia un mensaje mencionando a todos los usuarios
ᰔᩚ *#gp • #infogrupo*
> ✦  Ver la Informacion del grupo.
ᰔᩚ *#linea • #listonline*
> ✦ Ver la lista de los usuarios en linea.
ᰔᩚ *#setwelcome*
> ✦ Establecer un mensaje de bienvenida personalizado.
ᰔᩚ *#setbye*
> ✦ Establecer un mensaje de despedida personalizado.
ᰔᩚ *#link*
> ✦ El bot envia el link del grupo.
ᰔᩚ *admins • admin*
> ✦ Mencionar a los admins para solicitar ayuda.
ᰔᩚ *#restablecer • #revoke*
> ✦ Restablecer el enlace del grupo.
ᰔᩚ *#grupo • #group* [open / abrir]
> ✦ Cambia ajustes del grupo para que todos los usuarios envien mensaje.
ᰔᩚ *#grupo • #gruop* [close / cerrar]
> ✦ Cambia ajustes del grupo para que solo los administradores envien mensaje.
ᰔᩚ *#kick* [número / mension]
> ✦ Elimina un usuario de un grupo.
ᰔᩚ *#add • #añadir • #agregar* [número]
> ✦ Invita a un usuario a tu grupo.
ᰔᩚ *#promote* [mension / etiquetar]
> ✦ El bot dara administrador al usuario mencionando.
ᰔᩚ *#demote* [mension / etiquetar]
> ✦ El bot quitara administrador al usuario mencionando.
ᰔᩚ *#gpbanner • #groupimg*
> ✦ Cambiar la imagen del grupo.
ᰔᩚ *#gpname • #groupname*
> ✦ Cambiar el nombre del grupo.
ᰔᩚ *#gpdesc • #groupdesc*
> ✦ Cambiar la descripción del grupo.
ᰔᩚ *#advertir • #warn • #warning*
> ✦ Darle una advertencia aún usuario.
ᰔᩚ ︎*#unwarn • #delwarn*
> ✦ Quitar advertencias.
ᰔᩚ *#advlist • #listadv*
> ✦ Ver lista de usuarios advertidos.
ᰔᩚ *#bot on*
> ✦ Enciende el bot en un grupo.
ᰔᩚ *#bot off*
> ✦ Apaga el bot en un grupo.
ᰔᩚ *#mute* [mension / etiquetar]
> ✦ El bot elimina los mensajes del usuario.
ᰔᩚ *#unmute* [mension / etiquetar]
> ✦ El bot deja de eliminar los mensajes del usuario.
ᰔᩚ *#encuesta • #poll*
> ✦ Crea una encuesta.
ᰔᩚ *#delete • #del*
> ✦ Elimina mensaje de otros usuarios.
ᰔᩚ *#fantasmas*
> ✦ Ver lista de inactivos del grupo.
ᰔᩚ *#kickfantasmas*
> ✦ Elimina a los inactivos del grupo.
ᰔᩚ *#invocar • #tagall • #todos*
> ✦ Invoca a todos los usuarios de un grupo.
ᰔᩚ *#setemoji • #setemo*
> ✦ Cambia el emoji que se usa en la invitación de usuarios.
ᰔᩚ *#listnum • #kicknum*
> ✦ Elimine a usuario por el prefijo de país.

🎥 『𝘉𝘢𝘫𝘢 𝘭𝘢 𝘍𝘢𝘯𝘵𝘢𝘴𝘪́𝘢 — 𝘈𝘯𝘪𝘮𝘦 & 𝘔𝘢𝘨𝘪𝘢』
    
❍ `•˚⊹:･ﾟ• Sumergite en mundos increíbles con tus animes favoritos 🌌✨🎭
ᰔᩚ *#angry • #enojado* + <mencion>
> ✦ Estar enojado
ᰔᩚ *#bite* + <mencion>
> ✦ Muerde a alguien
ᰔᩚ *#bleh* + <mencion>
> ✦ Sacar la lengua
ᰔᩚ *#blush* + <mencion>
> ✦ Sonrojarte
ᰔᩚ *#bored • #aburrido* + <mencion>
> ✦ Estar aburrido
ᰔᩚ *#cry* + <mencion>
> ✦ Llorar por algo o alguien
ᰔᩚ *#cuddle* + <mencion>
> ✦ Acurrucarse
ᰔᩚ *#dance* + <mencion>
> ✦ Sacate los pasitos prohíbidos
ᰔᩚ *#drunk* + <mencion>
> ✦ Estar borracho
ᰔᩚ *#eat • #comer* + <mencion>
> ✦ Comer algo delicioso
ᰔᩚ *#facepalm* + <mencion>
> ✦ Darte una palmada en la cara
ᰔᩚ *#happy • #feliz* + <mencion>
> ✦ Salta de felicidad
ᰔᩚ *#hug* + <mencion>
> ✦ Dar un abrazo
ᰔᩚ *#impregnate • #preg* + <mencion>
> ✦ Embarazar a alguien
ᰔᩚ *#kill* + <mencion>
> ✦ Toma tu arma y mata a alguien
ᰔᩚ *#kiss • #besar* • #kiss2 + <mencion>
> ✦ Dar un beso
ᰔᩚ *#laugh* + <mencion>
> ✦ Reírte de algo o alguien
ᰔᩚ *#lick* + <mencion>
> ✦ Lamer a alguien
ᰔᩚ *#love • #amor* + <mencion>
> ✦ Sentirse enamorado
ᰔᩚ *#pat* + <mencion>
> ✦ Acaricia a alguien
ᰔᩚ *#poke* + <mencion>
> ✦ Picar a alguien
ᰔᩚ *#pout* + <mencion>
> ✦ Hacer pucheros
ᰔᩚ *#punch* + <mencion>
> ✦ Dar un puñetazo
ᰔᩚ *#run* + <mencion>
> ✦ Correr
ᰔᩚ *#sad • #triste* + <mencion>
> ✦ Expresar tristeza
ᰔᩚ *#scared* + <mencion>
> ✦ Estar asustado
ᰔᩚ *#seduce* + <mencion>
> ✦ Seducir a alguien
ᰔᩚ *#shy • #timido* + <mencion>
> ✦ Sentir timidez
ᰔᩚ *#slap* + <mencion>
> ✦ Dar una bofetada
ᰔᩚ *#dias • #days*
> ✦ Darle los buenos días a alguien 
ᰔᩚ *#noches • #nights*
> ✦ Darle las buenas noches a alguien 
ᰔᩚ *#sleep* + <mencion>
> ✦ Tumbarte a dormir
ᰔᩚ *#smoke* + <mencion>
> ✦ Fumar
ᰔᩚ *#think* + <mencion>
> ✦ Pensar en algo

🚫 『𝙉𝙊 𝙀𝙎𝙏𝘼́𝙉 𝘼𝙌𝙐𝙄 𝙇𝙊𝙎 𝘾𝙊𝙈𝘼𝙉𝘿𝙊𝙎 𝙉𝙎𝙁𝙒』
❍ `•˚⊹:･ﾟ• Acá no se permiten esas cosas… ¡Seguimos puros y fuertes! 💪😼

🎮 『𝙂𝙊𝙉𝙕𝙊 𝙋𝙇𝘼𝙔 𝙔𝙊𝙐𝙍 𝙁𝙍𝙄𝙀𝙉𝘿𝙎』
    
❍ `•˚⊹:･ﾟ• Comandos para jugar y pasarla brutal con tu crew 👾🔥
ᰔᩚ *#amistad • #amigorandom* 
> ✦ hacer amigos con un juego. 
ᰔᩚ *#chaqueta • #jalamela*
> ✦ Hacerte una chaqueta.
ᰔᩚ *#chiste*
> ✦ La bot te cuenta un chiste.
ᰔᩚ *#consejo* 
> ✦ La bot te da un consejo. 
ᰔᩚ *#doxeo • #doxear* + <mencion>
> ✦ Simular un doxeo falso.
ᰔᩚ *#facto*
> ✦ La bot te lanza un facto. 
ᰔᩚ *#formarpareja*
> ✦ Forma una pareja. 
ᰔᩚ *#formarpareja5*
> ✦ Forma 5 parejas diferentes.
ᰔᩚ *#frase*
> ✦ La bot te da una frase.
ᰔᩚ *#huevo*
> ✦ Agarrale el huevo a alguien.
ᰔᩚ *#chupalo* + <mencion>
> ✦ Hacer que un usuario te la chupe.
ᰔᩚ *#aplauso* + <mencion>
> ✦ Aplaudirle a alguien.
ᰔᩚ *#marron* + <mencion>
> ✦ Burlarte del color de piel de un usuario. 
ᰔᩚ *#suicidar*
> ✦ Suicidate. 
ᰔᩚ *#iq • #iqtest* + <mencion>
> ✦ Calcular el iq de alguna persona. 
ᰔᩚ *#meme*
> ✦ La bot te envía un meme aleatorio. 
ᰔᩚ *#morse*
> ✦ Convierte un texto a codigo morse. 
ᰔᩚ *#nombreninja*
> ✦ Busca un nombre ninja aleatorio. 
ᰔᩚ *#paja • #pajeame* 
> ✦ La bot te hace una paja.
ᰔᩚ *#personalidad* + <mencion>
> ✦ La bot busca tu personalidad. 
ᰔᩚ *#piropo*
> ✦ Lanza un piropo.
ᰔᩚ *#pregunta*
> ✦ Hazle una pregunta a la bot.
ᰔᩚ *#ship • #pareja*
> ✦ La bot te da la probabilidad de enamorarte de una persona. 
ᰔᩚ *#sorteo*
> ✦ Empieza un sorteo. 
ᰔᩚ *#top*
> ✦ Empieza un top de personas.
ᰔᩚ *#formartrio* + <mencion>
> ✦ Forma un trio.
ᰔᩚ *#ahorcado*
> ✦ Diviertete con la bot jugando el juego ahorcado.
ᰔᩚ *#mates • #matematicas*
> ✦ Responde las preguntas de matemáticas para ganar recompensas.
ᰔᩚ *#ppt*
> ✦ Juega piedra papel o tijeras con la bot.
ᰔᩚ *#sopa • #buscarpalabra*
> ✦ Juega el famoso juego de sopa de letras.
ᰔᩚ *#pvp • #suit* + <mencion>
> ✦ Juega un pvp contra otro usuario.
ᰔᩚ *#ttt*
> ✦ Crea una sala de juego.

    let imageUrl = 'https://static.wikia.nocookie.net/freddy-fazbears-pizza/images/c/c6/FNaFMovie-Header2.jpg/revision/latest/scale-to-width-down/250?cb=20230518194602'



    await conn.sendMessage(m.chat, { 
        image: { url: imageUrl }, 
        caption: txt 
    }, { quoted: m })
}
