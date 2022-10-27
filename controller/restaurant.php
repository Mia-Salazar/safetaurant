<?php 
  //Funcionalidad de la página de detalle de restaurnate
  include "../model/query.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);
  //Comprobamos si hemos recibido el ID del restaurante
  if(isset($formInfo['ID'])) {
    //Buscamos en la BBDD el restaurante con ese ID
    $restaurant = getRestaurant($formInfo['ID']);
    if($restaurant) {
      //Devolvemos los datos de los restaurantes
      echo json_encode($restaurant);
    } else {
      //Si no hemos encontrado un restaurante con este ID, devolvemos 404, "no encontrado"
      http_response_code(404);
      exit;
    }
  } else {
    //Si no hay ID del restaurante devolvemos un error
    http_response_code(400);
    exit;
  }
?>