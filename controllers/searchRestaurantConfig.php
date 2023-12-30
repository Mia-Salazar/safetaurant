<?php 
  //Funcionalidad de la página de detalle de restaurante
  include "../model/queryScore.php";

  if(isset($_GET['restaurantID'])) {
    //Buscamos en la BBDD el restaurante con ese ID
    $config = getRestaurantConfig($_GET['restaurantID']);
    if($config) {
      //Devolvemos los datos de los restaurantes
      echo json_encode($config);
    } else {
      //Si no hemos encontrado un restaurante con este ID, devolvemos 404 ya que no lo hemos encontrado
      http_response_code(404);
      exit;
    }
  } else {
    //Si no hay ID del restaurante devolvemos un error
    http_response_code(400);
    exit;
  }
?>