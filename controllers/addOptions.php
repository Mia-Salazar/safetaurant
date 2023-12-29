<?php 
  //Funcionalidades para la página de añadir puntuación
  include "../model/queryScore.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_COOKIE['userID'])) {
    //Añadimos la nueva calificación
    $option = addOptions($formInfo['celiacDisease'], $formInfo['diabetes'], $formInfo['lactoseIntolerant'],  
    $formInfo['fructoseIntolerant'], $formInfo['vegan'], $formInfo['vegetarian'], $formInfo['restaurantID'], 
    $formInfo['id'], $formInfo['accesibleMenu'], $formInfo['accesibleTable'], $formInfo['accesibleParking'],
    $formInfo['accesibleBathroom']);
    if($option) {
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