let handler = async (m, { args, conn }) => {
  let personajes = {
    freddy: {
      nombre: "Freddy Fazbear",
      juego: "FNaF 1",
      descripcion: "El icónico animatrónico del primer juego. Aparece en el escenario principal y ataca desde la izquierda.",
      imagen: "https://i.imgur.com/BhtM3Kr.jpg"
    },
    bonnie: {
      nombre: "Bonnie",
      juego: "FNaF 1",
      descripcion: "El guitarrista del grupo. Muy activo desde la noche 1.",
      imagen: "https://i.imgur.com/6yKzPZC.jpg"
    },
    chica: {
      nombre: "Chica",
      juego: "FNaF 1",
      descripcion: "La animatrónica amarilla. Suele ir por el pasillo derecho.",
      imagen: "https://i.imgur.com/MYF4cqb.jpg"
    }
  }

  let personaje = personajes[args[0]?.toLowerCase()]
  if (!personaje) return m.reply('❗ Usa: *.personaje freddy* | *bonnie* | *chica*')

  await conn.sendMessage(m.chat, {
    image: { url: personaje.imagen },
    caption: `👤 *${personaje.nombre}*\n🎮 Juego: ${personaje.juego}\n📝 ${personaje.descripcion}`
  }, { quoted: m })
}

handler.command = /^personaje$/i
export default handler
