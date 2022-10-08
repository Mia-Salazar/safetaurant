<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['Name'])){
    $restaurants = checkUniqueEmail($formInfo['Email']);
    if($restaurants) {
      echo json_encode($restaurants);
    }else {
      http_response_code(204);
      exit;
    }
  } else {
    http_response_code(404);
    exit;
  }
?>