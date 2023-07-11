<?php 
  //Funcionalidades para la página de añadir puntuación
  include "../model/queryPerson.php";
  include_once "../model/queryScore.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_COOKIE['userID'])) {
    //Añadimos la nueva calificación
    $commentsNumber = getScoresNumber($formInfo['restaurantID']);

    if ($commentsNumber['scoreNumber'] > 1) {
        $comment = deleteComments($formInfo['scoreID']);
        if($comment) {
          //Si tenemos éxito devolvemos un mensaje mostrando que todo ha ido bien
          echo "OK";
        } else {
          //Si sucede algún error durante la creación devolvemos ún código 424
          http_response_code(424);
          exit;
        }
    } else {
        http_response_code(409);
        exit;
    }
  } else {
    //Si el usuario no está autorizado le devolvemos un 401
    http_response_code(401);
    exit;
  }
?>