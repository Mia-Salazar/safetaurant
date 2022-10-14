<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['email'])){
    $isUnique = checkUniqueEmail($formInfo['email']);
    if ($isUnique) {
      $data = registerUser($formInfo['name'], $formInfo['email'], $formInfo['birthDate'], $formInfo['password'], $formInfo['surname'], $formInfo['lactoseIntolerance'], $formInfo['celiacDisease'], $formInfo['allergies']);
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
  }
?>