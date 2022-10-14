<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);

  if(isset($formInfo['ID'])) {
    $restaurant = getRestaurant($formInfo['ID']);
    if($restaurant) {
      echo json_encode($restaurant);
    } else {
      http_response_code(400);
      exit;
    }
  } else {
    http_response_code(400);
    exit;
  }
?>