<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($_COOKIE['userID'])) {
    $data = editUser($_COOKIE['userID'], $formInfo['name'], $formInfo['surname'], $formInfo['password'],  $formInfo['lactoseIntolerance'], $formInfo['celiacDisease'], $formInfo['allergies']);
    if($data) {
      echo "OK";
    } else {
      http_response_code(400);
      exit;
    };
  } else {
    http_response_code(401);
    exit;
  }
?>