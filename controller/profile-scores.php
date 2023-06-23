<?php 
  //Esta funcionalidad la usamos en la página de perfil para obtene run usuario
  include "../model/queryPerson.php";

  //Comprobamos si el usuario está activo
  if(isset($_COOKIE['userID'])) {
    //Obtenemos los restaurantes buscando por su ID
    $comments = getPersonComments($_COOKIE['userID']);
    if($comments) {
      //Enviamos los resultados
      echo json_encode($comments);
    } else {
      //Si no se ha encontrado ningún restaurante que coincida con los criterios, devolvemos un 204, ya que no hay contenido
      http_response_code(204);
      exit;
    }
  } else {
    //Si el usuario no está autorizado le devolvemos un 401
    http_response_code(401);
    exit;
  }
?>