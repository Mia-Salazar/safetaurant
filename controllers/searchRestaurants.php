<?php

    // Tu clave de API
    $api_key = 'pk.d477e05225782037d576e7c4eb3f445c';

    // La URL de la API con los parámetros
    $url = "https://us1.locationiq.com/v1/search?key={$api_key}&q=Statue%20of%20Liberty,%20New%20York&format=json";

    // Realizar la solicitud a la API y obtener la respuesta
    $response = file_get_contents($url);

    // Verificar si la solicitud fue exitosa
    if ($response === FALSE) {
        die('Error al realizar la solicitud a la API');
    }

    // Decodificar la respuesta JSON
    $data = json_decode($response, TRUE);

    // Verificar si la decodificación fue exitosa
    if ($data === NULL) {
        die('Error al decodificar la respuesta JSON');
    }

    // Imprimir la respuesta
    echo json_encode($data);
?>