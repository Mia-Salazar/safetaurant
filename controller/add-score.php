<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);

  if(isset($_COOKIE['userID'])) {
    $score = addScore($formInfo['comment'], $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore'], $_COOKIE['userName'], $_COOKIE['userID'], $formInfo['restaurantID'], $formInfo['created']);
    if($score) {
      echo "OK";
    } else {
      http_response_code(424);
      exit;
    }
  } else {
    http_response_code(401);
    exit;
  }
?>