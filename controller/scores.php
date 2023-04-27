<?php 
  //Esta funcionalidad pertenece a la página de detalle de restaurante
  //Obtenemos todas las puntuaciones de un restaurante
  include "../model/queryRestaurant.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);
  //Comprobamos si hemos recibido un ID
  if(isset($formInfo['ID'])) {
    //Buscamos las puntuaciones de un restaurante por su ID
    $restaurant = getScores($formInfo['ID']);
    if($restaurant) {
      //Devolvemos las calificaciones
      echo json_encode($restaurant);
    } else {
      //Si no hay evaluaciones, devolvemos un 404 ya que no lo hemos encontrado
      http_response_code(404);
      exit;
    }
  } else {
    //Si no hemos recibido un ID, devolvemos un error
    http_response_code(400);
    exit;
  }
?>