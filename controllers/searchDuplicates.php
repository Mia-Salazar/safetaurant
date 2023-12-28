<?php 
  //Esta funcionalidad pertenece a la página de detalle de restaurante
  //Obtenemos todas las puntuaciones de un restaurante
  include "../model/queryRestaurant.php";

  //Comprobamos si hemos recibido un ID
  if(isset($_GET['name'])) {
    //Buscamos las puntuaciones de un restaurante por su ID
    $restaurant = getRestaurantsByAddress($_GET['name'], $_GET['lat'], $_GET['long']);
    echo json_encode($restaurant);
  } else {
    //Si no hemos recibido un ID, devolvemos un error
    http_response_code(400);
    exit;
  }
?>