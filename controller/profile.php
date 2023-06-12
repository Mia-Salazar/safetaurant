<?php 
  //Esta funcionalidad la usamos en la página de perfil para obtene run usuario
  include "../model/queryPerson.php";

  session_start();
  //Comprobamos si el usuario está activo
  if(isset($_SESSION['uid'])) {
    //Obtenemos el usuario buscando por su ID
    $user = getUser($_SESSION['uid']);
    if($user) {
      //Devolvemos los datos
      echo json_encode($user);
    } else {
      //Devolvemos que ha ocurrido un error
      http_response_code(400);
      exit;
    }
  } else {
    //Si el usuario no está autorizado le devolvemos un 401
    http_response_code(401);
    exit;
  }
?>