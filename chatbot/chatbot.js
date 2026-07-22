
// =======================================
// EDUFAUNA BOT
// =======================================

let ultimoAnimal = null;
let esperandoRespuesta = false;

// =======================================
// INICIAR CHATBOT
// =======================================

window.addEventListener("DOMContentLoaded", () => {

    if (window.BOT && window.BOT.bienvenida) {

        agregarMensaje(
            window.BOT.bienvenida,
            "bot-msg"
        );

    }

});


// =======================================
// ABRIR / CERRAR CHAT
// =======================================

function alternarChat() {

    const chatbot =
        document.getElementById("chatbot-container");

    if (chatbot) {

        chatbot.classList.toggle(
            "chatbot-closed"
        );

    }

}


// =======================================
// DETECTAR ENTER
// =======================================

function verificarEnter(event) {

    if (event.key === "Enter") {

        enviarMensaje();

    }

}


// =======================================
// AGREGAR MENSAJE
// =======================================

function agregarMensaje(texto, clase) {

    const mensajes =
        document.getElementById(
            "chatbot-messages"
        );

    if (!mensajes) return;


    const p =
        document.createElement("p");


    p.className =
        clase;


    p.innerHTML =
        convertirFormato(texto);


    mensajes.appendChild(p);


    mensajes.scrollTop =
        mensajes.scrollHeight;

}


// =======================================
// MOSTRAR "ESCRIBIENDO"
// =======================================

function escribiendo() {

    const mensajes =
        document.getElementById(
            "chatbot-messages"
        );

    if (!mensajes) return;


    if (
        document.getElementById("typing")
    ) {
        return;
    }


    const p =
        document.createElement("p");

    p.className =
        "bot-msg bot-msg-loading";

    p.id = "typing";


    p.innerHTML = `
        <span class="typing-text">
            🐾 EduFauna está pensando
        </span>
        <span class="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </span>
    `;


    mensajes.appendChild(p);

    mensajes.scrollTop =
        mensajes.scrollHeight;

}


// =======================================
// QUITAR "ESCRIBIENDO"
// =======================================

function quitarEscribiendo() {

    const typing =
        document.getElementById(
            "typing"
        );

    if (typing) {

        typing.remove();

    }

}


// =======================================
// ENVIAR MENSAJE
// =======================================

async function enviarMensaje() {

    // ===================================
    // EVITAR VARIAS PREGUNTAS A LA VEZ
    // ===================================

    if (esperandoRespuesta) {
        return;
    }

    const input =
        document.getElementById("user-input");

    const boton =
        document.querySelector(
            "#chatbot-input-area button"
        );

    if (!input) return;

    const textoOriginal =
        input.value.trim();

    // No enviar vacío
    if (textoOriginal === "") {
        return;
    }


    // ===================================
    // BLOQUEAR CHAT
    // ===================================

    esperandoRespuesta = true;

    input.disabled = true;

    if (boton) {
        boton.disabled = true;
        boton.style.opacity = "0.6";
        boton.style.cursor = "not-allowed";
    }


    // ===================================
    // MOSTRAR MENSAJE USUARIO
    // ===================================

    agregarMensaje(
        textoOriginal,
        "user-msg"
    );

    input.value = "";


    // ===================================
    // MOSTRAR ESCRIBIENDO
    // ===================================

    escribiendo();


    try {

        const respuesta =
            await procesarPregunta(
                textoOriginal
            );


        quitarEscribiendo();


        agregarMensaje(
            respuesta,
            "bot-msg"
        );


    } catch (error) {

        console.error(
            "Error procesando pregunta:",
            error
        );


        quitarEscribiendo();


        agregarMensaje(
            "🌿 Ocurrió un problema al procesar tu pregunta.",
            "bot-msg"
        );


    } finally {

        // ===================================
        // VOLVER A ACTIVAR CHAT
        // ===================================

        esperandoRespuesta = false;

        input.disabled = false;

        if (boton) {

            boton.disabled = false;

            boton.style.opacity = "1";

            boton.style.cursor = "pointer";

        }

        // Volver a colocar el cursor
        input.focus();

    }

}



// =======================================
// PROCESAR PREGUNTA
// =======================================

async function procesarPregunta(textoOriginal) {

    // Guardamos el texto original para enviarlo a Gemini
    const textoUsuario = textoOriginal.trim();

    // Normalizamos solamente para analizar palabras clave
    const texto = normalizar(textoOriginal);


    // ===================================
    // SALUDOS
    // ===================================

    if (
        window.palabras &&
        contiene(texto, window.palabras.saludo)
    ) {

        return aleatorio(
            window.RESPUESTAS.saludos
        );

    }


    // ===================================
    // DESPEDIDAS
    // ===================================

    if (
        window.palabras &&
        contiene(texto, window.palabras.despedida)
    ) {

        return aleatorio(
            window.RESPUESTAS.despedidas
        );

    }


    // ===================================
    // BUSCAR ANIMAL EN LA BASE LOCAL
    // ===================================

    const animal =
        await buscarAnimal(texto);


    // ===================================
    // SI ENCONTRÓ UN ANIMAL
    // ===================================

    if (animal) {

        // Guardamos el último animal mencionado
        ultimoAnimal = animal;


        // -----------------------------------
        // ALIMENTACIÓN
        // -----------------------------------

        if (
            contiene(
                texto,
                window.palabras.alimentacion
            )
        ) {

            return "🌿 " + animal.alimentacion;

        }


        // -----------------------------------
        // HÁBITAT
        // -----------------------------------

        if (
            contiene(
                texto,
                window.palabras.habitat
            )
        ) {

            return "🌎 " + animal.habitat;

        }


        // -----------------------------------
        // CURIOSIDAD
        // -----------------------------------

        if (
            contiene(
                texto,
                window.palabras.curiosidad
            )
        ) {

            return "💡 " + animal.curiosidad;

        }


        // -----------------------------------
        // ESTADO DE CONSERVACIÓN
        // -----------------------------------

        if (
            contiene(
                texto,
                window.palabras.estado
            )
        ) {

            return "⚠️ " + animal.estado;

        }


        // -----------------------------------
        // SI PREGUNTA POR TAMAÑO
        // -----------------------------------

        if (
            texto.includes("grande") ||
            texto.includes("tamano") ||
            texto.includes("tamaño") ||
            texto.includes("mide") ||
            texto.includes("medida") ||
            texto.includes("longitud") ||
            texto.includes("peso") ||
            texto.includes("pesa")
        ) {

            // No tenemos ese dato en la base local.
            // Por eso enviamos la pregunta a Gemini.
            if (
                typeof obtenerRespuestaIA === "function"
            ) {

                return await obtenerRespuestaIA(textoUsuario);

            }

        }


        // -----------------------------------
        // INFORMACIÓN GENERAL
        // -----------------------------------

        // Si la pregunta es claramente sobre
        // el animal y sí podemos responderla
        // con nuestra ficha, mostramos la ficha.

        if (
            texto.includes("hablame") ||
            texto.includes("informacion") ||
            texto.includes("información") ||
            texto.includes("que es") ||
            texto.includes("quien es") ||
            texto.includes("conoce") ||
            texto.includes("dime sobre")
        ) {

            return `
<b>${animal.nombre.toUpperCase()}</b>

${animal.descripcion}

🌎 ${animal.habitat}

🌿 ${animal.alimentacion}

⚠️ ${animal.estado}

💡 ${animal.curiosidad}
`;

        }

        // Si encontró el animal pero la pregunta
        // no está cubierta por la base local,
        // enviamos la pregunta completa a Gemini.

        if (
            typeof obtenerRespuestaIA === "function"
        ) {

            return await obtenerRespuestaIA(textoUsuario);

        }

    }


    // ===================================
    // PREGUNTAS SOBRE ANIMALES
    // ===================================

    // IMPORTANTE:
    // YA NO debemos devolver aquí el mensaje:
    //
    // "¡Claro! Puedo ayudarte..."
    //
    // porque eso impedía que Gemini recibiera
    // preguntas como:
    //
    // "animales con manchas"
    // "cuales son los animales con manchas"
    //
    // Ahora esas preguntas pasan directamente
    // a Gemini.


    // ===================================
    // CONSULTAR GEMINI
    // ===================================

    if (
        typeof obtenerRespuestaIA === "function"
    ) {

        return await obtenerRespuestaIA(textoUsuario);

    }


    // ===================================
    // RESPUESTA DE EMERGENCIA
    // ===================================

    return aleatorio(
        window.RESPUESTAS.desconocido
    );

}




// =======================================
// BUSCAR ANIMAL
// =======================================

async function buscarAnimal(texto) {

    try {

        const listaAnimales =
            await obtenerAnimales();


        if (
            !Array.isArray(
                listaAnimales
            )
        ) {

            return null;

        }


        for (
            const animal
            of listaAnimales
        ) {


            if (
                !animal.alias ||
                !Array.isArray(
                    animal.alias
                )
            ) {

                continue;

            }


            for (
                const alias
                of animal.alias
            ) {

                const aliasNormalizado =
                    normalizar(alias);


                if (
                    texto.includes(
                        aliasNormalizado
                    )
                ) {

                    return animal;

                }

            }

        }


        return null;


    } catch (error) {

        console.error(
            "Error buscando animal:",
            error
        );


        return null;

    }

}


// =======================================
// COMPROBAR PALABRAS CLAVE
// =======================================

function contiene(
    texto,
    lista
) {

    if (
        !Array.isArray(lista)
    ) {

        return false;

    }


    for (
        const palabra
        of lista
    ) {

        if (
            texto.includes(
                normalizar(palabra)
            )
        ) {

            return true;

        }

    }


    return false;

}


// =======================================
// NORMALIZAR TEXTO
// =======================================

function normalizar(texto) {

    return String(texto)

        .toLowerCase()

        .normalize("NFD")

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[¿?¡!.,;:]/g,
            ""
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


// =======================================
// RESPUESTA ALEATORIA
// =======================================

function aleatorio(lista) {

    if (
        !Array.isArray(lista) ||
        lista.length === 0
    ) {

        return (
            "🐾 No tengo una respuesta disponible."
        );

    }


    return lista[
        Math.floor(
            Math.random() *
            lista.length
        )
    ];

}

// =======================================
// CONVERTIR MARKDOWN BÁSICO A HTML
// =======================================

function convertirFormato(texto) {

    let resultado =
        String(texto);


    // ===================================
    // ESCAPAR HTML PELIGROSO
    // ===================================

    resultado =
        resultado
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");


    // ===================================
    // NEGRITA
    // **texto**
    // ===================================

    resultado =
        resultado.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    // ===================================
    // CURSIVA
    // *texto*
    // ===================================

    resultado =
        resultado.replace(
            /(?<!\*)\*(?!\s)(.*?)(?<!\s)\*(?!\*)/g,
            "<em>$1</em>"
        );


    // ===================================
    // LISTAS
    // ===================================

    resultado =
        resultado.replace(
            /^\s*\*\s+/gm,
            "• "
        );


    resultado =
        resultado.replace(
            /^\s*-\s+/gm,
            "• "
        );


    // ===================================
    // SALTOS DE LÍNEA
    // ===================================

    resultado =
        resultado.replace(
            /\n/g,
            "<br>"
        );


    return resultado;

}


// =======================================
// HACER FUNCIONES ACCESIBLES AL HTML
// =======================================

window.enviarMensaje =
    enviarMensaje;


window.verificarEnter =
    verificarEnter;


window.alternarChat =
    alternarChat;

