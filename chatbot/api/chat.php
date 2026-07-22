<?php

header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/config.php";

if (!defined("GEMINI_API_KEY") || empty(GEMINI_API_KEY)) {
    echo json_encode([
        "respuesta" => "❌ La clave de Gemini no está configurada."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Leer datos enviados desde JavaScript
$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos || !isset($datos["mensaje"])) {
    echo json_encode([
        "respuesta" => "❌ No recibí ningún mensaje."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$mensaje = trim($datos["mensaje"]);

if ($mensaje === "") {
    echo json_encode([
        "respuesta" => "🦁 Escribe una pregunta sobre animales o naturaleza."
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Instrucciones para Gemini
$prompt = "
Eres EduFauna Bot, un asistente educativo amigable especializado en animales, naturaleza y educación ambiental.

Tu objetivo es ayudar principalmente a niños y adolescentes a aprender de forma sencilla, entretenida y educativa.

Puedes responder preguntas relacionadas directa o indirectamente con:

- Animales
- Especies
- Mamíferos
- Aves
- Reptiles
- Anfibios
- Peces
- Insectos
- Animales marinos
- Animales terrestres
- Animales domésticos y salvajes
- Hábitats
- Ecosistemas
- Alimentación de los animales
- Reproducción y ciclo de vida
- Comportamiento animal
- Características físicas de los animales
- Curiosidades sobre animales
- Animales más grandes, pequeños, rápidos o longevos
- Especies en peligro de extinción
- Conservación
- Biodiversidad
- Contaminación
- Cambio climático relacionado con la naturaleza
- Protección de los animales
- Cuidado del medio ambiente
- Relaciones entre animales y ecosistemas
- Preguntas educativas y curiosidades sobre la vida silvestre

IMPORTANTE:

Debes considerar que una pregunta está relacionada con EduFauna si su respuesta requiere hablar sobre animales, naturaleza, ecosistemas o medio ambiente, aunque la pregunta no mencione explícitamente la palabra 'animal'.

Por ejemplo, estas preguntas SÍ están relacionadas con EduFauna:

'¿Cuál es el animal más grande del mundo?'
'¿Qué animal corre más rápido?'
'¿Por qué las abejas son importantes?'
'¿Dónde vive el jaguar?'
'¿Qué pasaría si desaparecieran los bosques?'
'¿Cuál es el animal más longevo?'
'¿Cómo nacen las mariposas?'
'¿Por qué los osos polares están en peligro?'

Si la pregunta tiene una relación razonable con animales, naturaleza, biodiversidad o medio ambiente, RESPONDE la pregunta.

Solo rechaza la pregunta cuando claramente no tenga ninguna relación con animales, naturaleza, biodiversidad, ecosistemas o medio ambiente.

Para preguntas completamente ajenas al tema, responde de forma amable y breve indicando que EduFauna Bot está especializado en animales y naturaleza. Puedes variar ligeramente la respuesta para evitar repetir siempre exactamente el mismo mensaje.

No inventes datos científicos. Si no estás seguro de un dato, indícalo de forma sencilla.

Responde en español.

Si el usuario pregunta por un animal específico, responde directamente sobre ese animal.

Si pregunta por varios animales, responde sobre todos los animales relevantes.

Si pregunta por características como manchas, rayas, tamaño, velocidad, alimentación, hábitat o comportamiento, responde directamente a lo que está preguntando.

El usuario puede escribir con errores ortográficos, sin signos de interrogación o sin tildes. Interpreta correctamente la intención de la pregunta.

Utiliza un lenguaje claro, educativo y amigable para niños y adolescentes.

No uses Markdown.
No uses asteriscos.
No uses símbolos como ** para negrita.
Utiliza párrafos y listas con el símbolo • cuando sea necesario.
Puedes utilizar algunos emojis relacionados con el tema, pero no abuses de ellos.


Pregunta actual del usuario:

$mensaje
";

// Modelo de Gemini
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" . GEMINI_API_KEY;

// Cuerpo de la petición
$body = [
    "contents" => [
        [
            "parts" => [
                [
                    "text" => $prompt
                ]
            ]
        ]
    ]
];

// Inicializar cURL
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json"
]);

curl_setopt(
    $ch,
    CURLOPT_POSTFIELDS,
    json_encode($body, JSON_UNESCAPED_UNICODE)
);

// Ejecutar petición
$respuesta = curl_exec($ch);

// Comprobar error cURL
if ($respuesta === false) {

    $errorCurl = curl_error($ch);

    curl_close($ch);

    echo json_encode([
        "respuesta" => "❌ Error de conexión con Gemini.",
        "detalle" => $errorCurl
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

// Obtener código HTTP
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Convertir respuesta de Gemini
$json = json_decode($respuesta, true);

// Comprobar si la respuesta de Gemini es JSON válido
if ($json === null && json_last_error() !== JSON_ERROR_NONE) {

    echo json_encode([
        "respuesta" => "❌ Gemini devolvió una respuesta inválida.",
        "detalle" => $respuesta
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

// Comprobar error HTTP
if ($httpCode !== 200) {

    echo json_encode([
        "respuesta" => "❌ Gemini devolvió un error HTTP " . $httpCode,
        "detalle" => $json
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

// Extraer respuesta de Gemini
if (
    isset($json["candidates"][0]["content"]["parts"][0]["text"])
) {

    echo json_encode([
        "respuesta" => $json["candidates"][0]["content"]["parts"][0]["text"]
    ], JSON_UNESCAPED_UNICODE);

    exit;
}

// Si Gemini no devuelve texto
echo json_encode([
    "respuesta" => "🦁 No pude generar una respuesta en este momento.",
    "detalle" => $json
], JSON_UNESCAPED_UNICODE);

?>