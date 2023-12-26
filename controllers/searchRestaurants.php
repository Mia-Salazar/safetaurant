<?php

    if(isset($_GET['lat'])) {
        // Tu clave de API
        $api_key = '11397037cf9d4a50830e72fcc1aba68e';
        $lat = $_GET['lat'];
        $lon = $_GET['lon'];

        // La URL de la API con los parámetros
        $url = "https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:{$lon},{$lat},500&lang=es&apiKey={$api_key}";

        // Realizar la solicitud a la API y obtener la respuesta
        $response = file_get_contents($url);

        // Verificar si la solicitud fue exitosa
        if ($response === FALSE) {
            http_response_code(404);
            exit;
        }

        // Decodificar la respuesta JSON
        $data = json_decode($response, TRUE);

        // Verificar si la decodificación fue exitosa
        if ($data === NULL) {
            http_response_code(404);
            exit;
        }

        // Imprimir la respuesta
        echo json_encode($data);
        
    } else {
        //Si no hemos recibido un ID, devolvemos un error
        http_response_code(400);
        exit;
    }

?>