

<?php

require_once "config.php";

$url = "https://generativelanguage.googleapis.com/v1beta/models?key=" . GEMINI_API_KEY;

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$respuesta = curl_exec($ch);

if (curl_errno($ch)) {
    echo "Error cURL: " . curl_error($ch);
    exit;
}

curl_close($ch);

header("Content-Type: application/json; charset=UTF-8");

echo $respuesta;