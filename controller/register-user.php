<?php 
  //Esta funcionalidad forma parte de la página de crear usuario
  include "../model/query.php";

  //Obtenemos los datos que han sido enviados
  $formInfo = json_decode(file_get_contents("php://input"), true);
  //Comprobamos si hemos recibido el email, si no lo hemos recibido no podremos crear el usuario
  if(isset($formInfo['email'])){
    //Comprobamos si ya existe un usuario con dicho email
    $isUnique = checkUniqueEmail($formInfo['email']);
    if ($isUnique) {
      //Si el email es único, enviamos los datos para crear el usuario
      $data = registerUser($formInfo['name'], $formInfo['email'], $formInfo['birthDate'], $formInfo['password'], $formInfo['surname'], $formInfo['lactoseIntolerance'], $formInfo['celiacDisease'], $formInfo['allergies']);
      if($data) {
        //Si ha sido creado correctamente, devolvemos un mensaje de éxito
        echo "OK";
      } else {
        //Si ha sucedido algún error al crear el usuario, devolvemos un error
        http_response_code(400);
        exit;
      };
    } else {
      //Si ya está registrado el email, le devolvemos un error
      http_response_code(401);
      exit;
    }
  } else {
    //Si no viene el email, enviamos un código de error
    http_response_code(400);
    exit;
  }
?>