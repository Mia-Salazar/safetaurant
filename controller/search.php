<?php
  //Esta funcionalidad pertenece a la página de buscar restaurantes 
  include "../model/query.php";

  //Comprobamos si hemos recibido un nombre de restaurante
  if(isset($_GET['name'])){
    //Pedimos la búsqueda de restaurante enviando todos los filtros
    $restaurants = getRestaurants($_GET['name'], $_GET['province'], $_GET['foodType'], $_GET['order']);
    if($restaurants) {
      //Enviamos los resultados
      echo json_encode($restaurants);
    } else {
      //Si no se ha encontrado ningún restaurante que coincida con los criterios, devolvemos un 204, "sin contenido"
      http_response_code(204);
      exit;
    }
  } else {
    //Si no hemos recibido para buscar por nombre, devolvemos un 404
    http_response_code(404);
    exit;
  }
?>