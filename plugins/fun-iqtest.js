let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.iq)}`, m)
}
handler.help = ['iqtest']
handler.tags = ['fun']
handler.command = ['iqtest', 'iq']
handler.group = true
handler.register = true
handler.fail = null

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.iq = [
'*🧠 Tu IQ es de: 1*\n_Parece que un Cupcake de Toy Chica piensa más que tú._',
'*🧠 Tu IQ es de: 13*\n_Eso explica por qué sigues entrando a la pizzería de noche... solo._',
'*🧠 Tu IQ es de: 27*\n_Bonnie aplaudiría... si tuviera manos._',
'*🧠 Tu IQ es de: 42*\n_Estás al nivel de un endoesqueleto sin batería._',
'*🧠 Tu IQ es de: 69*\n_Ni Freddy puede hacer chistes con esto, está decepcionado._',
'*🧠 Tu IQ es de: 86*\n_Suficiente para gritar cuando ya es tarde._',
'*🧠 Tu IQ es de: 100*\n_Tienes el mismo IQ que un guardia promedio... en su primer turno._',
'*🧠 Tu IQ es de: 200*\n_Tal vez... solo tal vez... puedas sobrevivir cinco noches._',
'*🧠 Tu IQ es de: 350*\n_Glitchtrap está interesado en ti... corre._',
'*🧠 Tu IQ es de: 500*\n_Eres más brillante que las luces de seguridad._',
'*🧠 Tu IQ es de: 666*\n_Springtrap te quiere en su equipo._',
'*🧠 Tu IQ es de: 777*\n_¿Hackeaste el test o eres un animatrónico disfrazado?_',
'*🧠 Tu IQ es de: 999*\n_El mismísimo William Afton se siente intimidado._',
'*🧠 Tu IQ es de: 1000*\n_Felicidades, ahora puedes reiniciar los sistemas de FNaF sin morir._',
'*🧠 Tu IQ es: INFINITO 🌀*\n_La pizzería entera se arrodilla ante tu sabiduría maldita._',
'*🧠 Tu IQ es de: -100*\n_Hasta Balloon Boy se burla de ti._',
'*🧠 Tu IQ es de: ???*\n_Tu mente es tan inestable como el lore de FNaF._',
'*🧠 Tu IQ es de: 1987*\n_¡Bite of 87! ¡LO SABÍA!_*',
'*🧠 Tu IQ es de: 2023*\n_El año en que entendiste la historia completa de FNaF... o eso crees._',
'*🧠 Tu IQ es de: 9999*\n_Te ofrecieron ser el jefe de Fazbear Entertainment, pero dijiste "no gracias"._',
'*🧠 Tu IQ es de: 10000*\n_Tu mente reemplazó al CPU de Freddy. Literal._'
]
