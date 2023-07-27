<?php 
  //Esta funcionalidad se utiliza en el detalle de restaurante para obtener las puntuaciones medias
  include "../model/queryScore.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si hemos recibido un ID de restaurante
  if(isset($formInfo['ID'])) {
    //Solicitamos la media de un restaurante concreto
    $allergicReactions = getNumberOfAllergicReactions($formInfo['ID']);
    echo $allergicReactions[0]["allergicReactions"];
  } else {
    //Si no hemos recibido un ID respondemos con un 400
    http_response_code(400);
    exit;
  }
?>