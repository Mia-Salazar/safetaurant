<?php 
  //Esta funcionalidad se utiliza en el detalle de restaurante para obtener las puntuaciones medias
  include "../model/query.php";

  //Obtenemos los datos que han sido enviamos
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si hemos recibido un ID de restaurante
  if(isset($formInfo['ID'])) {
    //Solicitamos la media de un restaurante concreto
    $restaurant = getAverage($formInfo['ID']);
    if($restaurant) {
      //Devolvemos los datos
      echo json_encode($restaurant);
    } else {
      //Si no hemos encontrado un ID que corresponda a ninguno que tenemos en la BBDD, respondemos con un 400, "no encontrado"
      http_response_code(400);
      exit;
    }
  } else {
    //Si no hemos recibido un ID respondemos con un 400, "no encontrado"
    http_response_code(400);
    exit;
  }
?>