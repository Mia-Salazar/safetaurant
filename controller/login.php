<?php 
  //Funcionalidad de la página de inicio de sesión
  include "../model/query.php";

 //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);

  //Comprobamos si hemos recibido un email
  if(isset($formInfo['email'])){
    //Enviamos los datos para buscar un usuario con el email y contraseña que hemos recibido
    $user = login($formInfo['email'], $formInfo['password']);
    if ($user) {
      //Creamos las cookies de usuario y el nombre del usuario y devolvemos un mensaje de éxito
      //Guardamos el nombre de usuario para que cuando quiera añadir una puntuación no tengamos que pedir a la BBDD ese dato
      setcookie("userID", $user['userID'], time() + 7200, "/", NULL);
      setcookie("userName", $user['name'], time() + 7200, "/", NULL);
      echo "OK";

    } else {
      //Devolvemos un 401 si no hemos recibido un email
      http_response_code(401);
      exit;
    }
  }
?>