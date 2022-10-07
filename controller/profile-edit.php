<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($_COOKIE['UserID'])) {
    $data = editUser($_COOKIE['UserID'], $formInfo['Name'], $formInfo['Surname'], $formInfo['Password'],  $formInfo['LactoseIntolerance'], $formInfo['CeliacDisease'], $formInfo['Allergies']);
    if($data) {
      echo "OK";
    } else {
      echo "Hubo un error al crear el usuario";
    };
  } else {
    http_response_code(401);
    exit;
  }
?>