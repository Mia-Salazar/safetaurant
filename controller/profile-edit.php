<?php 
  //Esta funcionalidad pertnece a la página de perfil, y consiste en poder editarlo
  include "../model/query.php";

  //Obtenemos los datos que han sido enviamos
  $formInfo = json_decode(file_get_contents("php://input"), true);
  //Comprobamos si el usuario está autentificado mirando las cookies
  if(isset($_COOKIE['userID'])) {
    //Enviamos los datos que vamos a modificar
    $data = editUser($_COOKIE['userID'], $formInfo['name'], $formInfo['surname'], $formInfo['password'],  $formInfo['lactoseIntolerance'], $formInfo['celiacDisease'], $formInfo['allergies']);
    if($data) {
      //Si la edición ha sido correcta, devolvemos un mensaje de éxito
      echo "OK";
    } else {
      //Si ha habido algún error al editar, devolvemos un error
      http_response_code(400);
      exit;
    };
  } else {
    //Si el usuario no está autorizado le devolvemos un 401
    http_response_code(401);
    exit;
  }
?>