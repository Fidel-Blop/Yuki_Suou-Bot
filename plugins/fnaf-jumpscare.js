let handler = async (m, { conn }) => {
  let jumpscares = [
    "https://i.imgur.com/TYPnUIm.mp4", // Freddy
    "https://i.imgur.com/HtXyKpX.mp4", // Foxy
    "https://i.imgur.com/wGk6rJG.mp4"  // Golden Freddy
  ]
  let audio = [
    "https://www.myinstants.com/media/sounds/fnaf-jumpscare.mp3"
  ]

  let video = jumpscares[Math.floor(Math.random() * jumpscares.length)]

  await conn.sendMessage(m.chat, {
    video: { url: video },
    caption: "💀 ¡Jumpscare de FNaF!"
  }, { quoted: m })
}

handler.command = /^jumpscare$/i
export default handler
