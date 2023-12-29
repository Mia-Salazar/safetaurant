<?php

    if (isset($_GET['lat'])) {
        // Tu clave de API
        $api_key = 'pk.d477e05225782037d576e7c4eb3f445c';
        $lat = $_GET['lat'];
        $long = $_GET['long'];

        // La URL de la API con los parámetros
        $apiUrl = "https://maps.locationiq.com/v3/staticmap?key={$api_key}&center={$lat},{$long}&zoom=16&size=450x450&format=jpg&markers=icon:large-red-cutout%7C{$lat},{$long}";

        // Realiza la solicitud a la API
        $imageData = @file_get_contents($apiUrl);

        // Verifica si la solicitud fue exitosa
        if ($imageData === false) {
            die('Error al obtener la imagen desde la API.');
        }

        // Muestra la imagen en el navegador
        header('Content-Type: image/jpeg');
        echo $imageData;
    } else {
        // Si no hemos recibido un ID, devolvemos un error
        http_response_code(400);
        exit;
    }

?>
