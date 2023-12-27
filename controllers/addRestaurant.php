<?php
  //Funcionalidades para la página de añadir restaurante
  include "../model/queryRestaurant.php";
  include "../model/queryScore.php";
  
  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_COOKIE['userID'])) {
    //Enviamos los datos para crear un restaurante
    $data = registerRestaurant($formInfo['name'], $formInfo['province'], $formInfo['address'],  $formInfo['ZIP'], $formInfo['phone'], $formInfo['foodType'], $formInfo['id'], $formInfo['url'], $formInfo['latitude'], $formInfo['longitude'], $formInfo['apiID']);
    if($data) {
      //Si el restaurante ha sido creado correctanente, lanzamos la funcionalidad de crear la puntuación con sus datos
      echo $data;
    } else {
      //Si sucede algún error durante la creación devolvemos ún código 424
      http_response_code(424);
      exit;
    }
  } else {
    //Si el usuario no está autorizado le devolvemos un 401
    http_response_code(401);
    exit;
  }
?>