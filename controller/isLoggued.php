<?php 
  //Esta funcionalidad la usamos para comprobar si un usuario ah iniciado sesión
  include "../model/query.php";

  //Comprobamos si hay una cookie con el ID del usuario
  if(!isset($_COOKIE['userID'])) {
    //Si no hay cookie, devolvemos un 401, "No autorizado"
    http_response_code(401);
    exit;
  } else {
    //Si sí hay cookie mostramos un mensaje de éxito
    echo "OK";
  }
?>