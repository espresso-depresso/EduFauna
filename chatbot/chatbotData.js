// Base de conocimiento
// ===============================

window.BOT = {

    nombre: "EduFauna",

    emoji: "🦁",

    bienvenida:
`¡Hola! 👋

Soy EduFauna Bot.

Puedo ayudarte con:

🦁 Animales
🌎 Hábitats
🍃 Alimentación
⚠️ Estado de conservación
💡 Curiosidades

¿Sobre qué animal quieres aprender?`

};

// ===============================
// RESPUESTAS
// ===============================

window.RESPUESTAS = {

    saludos: [

        "¡Hola explorador! 🦁",

        "¡Bienvenido a EduFauna! 🌿",

        "¡Hola! ¿Qué animal quieres conocer? 🐾"

    ],

    despedidas: [

        "¡Hasta pronto! 🌎",

        "Nos vemos. Sigue cuidando la naturaleza 🦜",

        "¡Vuelve cuando quieras aprender sobre animales! 🐘"

    ],

    fueraTema: [

        "🐾 Solo puedo responder preguntas relacionadas con animales y naturaleza.",

        "🌿 Mi misión es ayudarte a descubrir el reino animal."

    ],

    desconocido: [

`🤔 No entendí tu pregunta.

Puedes escribir por ejemplo:

• Háblame del manatí
• ¿Qué come el cóndor?
• Dime una curiosidad`,

`🦁 Aún no conozco esa información.

Prueba preguntándome por otro animal.`

    ]

};

// ===============================
// PALABRAS CLAVE
// ===============================

window.palabras = {

    saludo:[
        "hola",
        "holi",
        "buenas",
        "hey",
        "hello"
    ],

    despedida:[
        "adios",
        "adiós",
        "bye",
        "hasta luego",
        "chao"
    ],

    alimentacion:[
        "come",
        "alimenta",
        "alimentación",
        "alimentacion",
        "comida",
        "dieta"
    ],

    habitat:[
        "vive",
        "hábitat",
        "habitat",
        "donde vive",
        "lugar"
    ],

    curiosidad:[
        "curiosidad",
        "dato",
        "interesante"
    ],

    estado:[
        "extinción",
        "extincion",
        "peligro",
        "conservación",
        "conservacion"
    ]

};

// ===============================
// ANIMALES
// ===============================

window.animales=[

{

nombre:"manatí",

alias:[
"manati",
"manatí",
"vaca marina"
],

descripcion:
"🌊 El manatí es un mamífero acuático herbívoro muy tranquilo.",

habitat:
"Vive en ríos, lagunas y costas tropicales.",

alimentacion:
"Se alimenta principalmente de plantas acuáticas.",

estado:
"Actualmente es una especie vulnerable.",

curiosidad:
"Puede contener la respiración hasta 20 minutos."

},

{

nombre:"cóndor de los andes",

alias:[
"condor",
"cóndor",
"condor de los andes"
],

descripcion:
"🦅 Es una de las aves voladoras más grandes del planeta.",

habitat:
"Habita en la Cordillera de los Andes.",

alimentacion:
"Es carroñero.",

estado:
"Está catalogado como vulnerable en varias regiones.",

curiosidad:
"Su envergadura puede superar los 3 metros."

},

{

nombre:"sapito de mucubají",

alias:[
"sapito",
"mucubaji",
"mucubají"
],

descripcion:
"🐸 Es un pequeño anfibio venezolano adaptado al frío.",

habitat:
"Habita en los páramos venezolanos.",

alimentacion:
"Insectos pequeños.",

estado:
"Se encuentra amenazado.",

curiosidad:
"Soporta temperaturas muy bajas."

}

];
// =====================================
// PROVEEDOR DE DATOS
// =====================================

// Hoy devuelve el arreglo local.
// En el futuro solo cambiará esta función.

async function obtenerAnimales(){

    return window.animales;

}