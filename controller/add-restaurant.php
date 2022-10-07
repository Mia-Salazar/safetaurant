<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($_COOKIE['UserID'])) {
    $data = registerRestaurant($formInfo['Name'], $formInfo['Province'], $formInfo['Address'],  $formInfo['ZIP'], $formInfo['Phone'], $formInfo['FoodType'], $formInfo['CCAA'], $_COOKIE['UserID']);
    if($data) {
      echo "OK";
    } else {
      echo "Hubo un error al crear el restaurante";
    };
  } else {
    http_response_code(401);
    exit;
  }
?>