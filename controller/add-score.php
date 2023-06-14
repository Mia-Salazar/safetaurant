<?php 
  //Funcionalidades para la página de añadir puntuación
  include "../model/queryScore.php";

  session_start();
  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_SESSION['uid'])) {
    //Añadimos la nueva calificación
    $score = addScore($formInfo['comment'], $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore'], $formInfo['userName'], $formInfo['id'], $formInfo['restaurantID'], $formInfo['created'], $formInfo['allergicReaction']);
    if($score) {
      //Si tenemos éxito devolvemos un mensaje mostrando que todo ha ido bien
      echo "OK";
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