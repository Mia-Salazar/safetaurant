<?php
  //Funcionalidades para la página de añadir restaurante
  include "../model/queryRestaurant.php";
  include "../model/queryScoret.php";
  
  session_start();
  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_SESSION['uid'])) {
    //Enviamos los datos para crear un restaurante
    $data = registerRestaurant($formInfo['name'], $formInfo['province'], $formInfo['address'],  $formInfo['ZIP'], $formInfo['phone'], $formInfo['foodType'], $_SESSION['uid'], $formInfo['url']);
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
    $score = addScore($formInfo['comment'], $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore'], $_COOKIE['userName'], $_SESSION['uid'], $data, $formInfo['created'], $_COOKIE['allergicReaction']);
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