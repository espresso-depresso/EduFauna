
// =====================================
// COMUNICACIÓN CON GEMINI
// =====================================

async function obtenerRespuestaIA(mensaje) {

    try {

        const respuesta = await fetch(
            "chatbot/api/chat.php",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    mensaje: mensaje
                })

            }
        );


        // Obtener respuesta como texto primero
        const textoRespuesta =
            await respuesta.text();


        console.log(
            "RESPUESTA COMPLETA DE chat.php:",
            textoRespuesta
        );


        // Intentar convertir a JSON
        let datos;

        try {

            datos =
                JSON.parse(textoRespuesta);

        } catch (error) {

            console.error(
                "La respuesta de chat.php NO es JSON válido.",
                textoRespuesta
            );

            throw new Error(
                "chat.php no devolvió JSON válido."
            );

        }


        // =================================
        // ERROR DEVUELTO POR PHP
        // =================================

        if (
            datos.error
        ) {

            console.error(
                "Error recibido desde PHP:",
                datos.error
            );

            return "🌿 No pude obtener una respuesta de la inteligencia artificial.";

        }


        // =================================
        // RESPUESTA CORRECTA
        // =================================

        if (
            datos.respuesta
        ) {

            return datos.respuesta;

        }


        // =================================
        // RESPUESTA VACÍA
        // =================================

        return "🐾 No recibí una respuesta de la inteligencia artificial.";


    } catch (error) {

        console.error(
            "Error en obtenerRespuestaIA:",
            error
        );

        return "🌿 En este momento no puedo conectarme con la inteligencia artificial.";

    }

}
