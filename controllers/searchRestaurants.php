<?php

    if(isset($_GET['address'])) {
        // Tu clave de API
        $api_key = 'pk.d477e05225782037d576e7c4eb3f445c';
        $address = $_GET['address'];

        // La URL de la API con los parámetros
        $url = "https://us1.locationiq.com/v1/search?key={$api_key}&q={$address}&format=json";

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