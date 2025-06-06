# 🤖 FNaF LATAM Bot

¡Bienvenido al Bot Oficial inspirado en **FNaF LATAM**! 🎉

Este bot está diseñado especialmente para los fanáticos de **Five Nights at Freddy's** en la comunidad LATAM, con comandos, juegos y funcionalidades ambientadas en el oscuro y misterioso universo de Freddy y sus aterradores amigos.

---

## 🔥 Características principales

- Juegos temáticos de FNaF como TicTacToe con temática oscura, desafíos matemáticos “terroríficos” y más.
- Comandos personalizados con ambientación y frases del universo FNaF LATAM.
- Moderación y administración de grupos para mantener la comunidad organizada.
- Sistema de niveles y recompensas para que tus partidas tengan más adrenalina.
- Respuestas con estilo único, haciendo referencia constante a la atmósfera de suspenso de FNaF.
- Actualizaciones constantes para agregar nuevas funciones y mantener vivo el terror. 

---

# 🤖 FNaF LATAM Bot - WhatsApp Bot para Termux

Un bot de WhatsApp enfocado en la comunidad **Five Nights at Freddy's LATAM**, desarrollado para ejecutarse de forma estable en **Termux**. Contiene comandos útiles, sin contenido NSFW, y puede funcionar 24/7 usando `pm2`.

---

## 🚀 Requisitos

- App **Termux** (desde [F-Droid](https://f-droid.org/) o GitHub)
- Android con permisos de almacenamiento
- Conexión a internet estable

---

## 📥 Instalación en Termux

### 1. Dar permisos al almacenamiento

```bash
termux-setup-storage

2. Actualizar Termux e instalar paquetes necesarios

apt update && apt upgrade -y
pkg install -y git nodejs ffmpeg imagemagick yarn

3. Clonar este repositorio

git clone https://github.com/Fidel-Blop/FNaF-LATAM-Bot.git
cd FNaF-LATAM-Bot

4. Instalar las dependencias del bot

yarn install
# o si preferís usar npm:
# npm install

5. Iniciar el bot manualmente

npm start

🔹 Si el bot te pide escanear un QR, hacelo solo una vez.
🔹 Una vez conectado, presioná CTRL + C para detenerlo antes de seguir con pm2.


---

🛠 Ejecutar el bot 24/7 con pm2 (opcional pero recomendado)

6. Instalar y configurar pm2

npm install -g pm2
pm2 start index.js
pm2 save
pm2 startup

Este proceso mantiene el bot encendido aunque cierres Termux o apagues la pantalla.


---

🧼 Limpieza y mantenimiento

Para ver el estado del bot:

pm2 list

Para reiniciarlo manualmente:

pm2 restart index

Para detenerlo:

pm2 stop index

---

📌 Nota

Este bot no incluye ni permite contenido NSFW, gore ni +18. Está pensado para el entretenimiento y organización de comunidades relacionadas con FNaF en LATAM.

---

📢 Grupos y Comunidad FNaF LATAM

Únete a la comunidad oficial para compartir partidas, noticias y más:

Comunidad Oficial de WhatsApp: Enlace aquí https://chat.whatsapp.com/HU9Dkmzru1P3od24zB1Mvl

Discord FNaF LATAM: Enlace aquí

Facebook FNaF LATAM: Enlace aquí



---

📜 Licencia

Este proyecto está bajo la licencia MIT.
Usa con responsabilidad y mantén el respeto dentro de la comunidad.

---

“En la oscuridad de Freddy's, cada segundo cuenta. ¿Estás listo para enfrentar el terror?”
— FNaF LATAM Bot Team


---

© 2025 FNaF LATAM Bot - Todos los derechos reservados.

