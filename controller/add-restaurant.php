<?php
  //Funcionalidades para la página de añadir restaurante
  include "../model/query.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_COOKIE['userID'])) {
    //Enviamos los datos para crear un restaurante
    $data = registerRestaurant($formInfo['name'], $formInfo['province'], $formInfo['address'],  $formInfo['ZIP'], $formInfo['phone'], $formInfo['foodType'], $_COOKIE['userID'], $formInfo['url']);
    if($data) {
      //Si el restaurante ha sido creado correctanente, lanzamos la funcionalidad de crear la puntuación con sus datos
     createScore($data, $formInfo);
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

  function createScore($data, $formInfo) {
    //Añadimos la nueva calificación
    $score = addScore($formInfo['comment'], $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore'], $_COOKIE['userName'], $_COOKIE['userID'], $data, $formInfo['created']);
    if($score) {
      //Si tenemos éxito devolvemos un mensaje que indica que todo ha ido bien
      echo "OK";
    } else {
      //Si sucede algún error durante la creación devolvemos ún código 424
      http_response_code(424);
      exit;
    }
  }
?>