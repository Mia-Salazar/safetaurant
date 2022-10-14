<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($_COOKIE['userID'])) {
    $data = registerRestaurant($formInfo['name'], $formInfo['province'], $formInfo['address'],  $formInfo['ZIP'], $formInfo['phone'], $formInfo['foodType'], $formInfo['CCAA'], $_COOKIE['userID']);
    if($data) {
     createScore($data, $formInfo);
    } else {
      http_response_code(424);
      exit;
    }
  } else {
    http_response_code(401);
    exit;
  }

  function createScore($data, $formInfo) {
    $score = addScore($formInfo['comment'], $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore'], $_COOKIE['userName'], $_COOKIE['userID'], $data, $formInfo['created']);
    if($score) {
      createAverage($data, $formInfo);
    } else {
      http_response_code(424);
      exit;
    }
  }

  function createAverage($data, $formInfo) {
    $average = addAverage($data, $formInfo['generalScore'], $formInfo['allergenChart'],  $formInfo['fidelityScore'], $formInfo['attentionScore']);
    if($average) {
      echo "OK";
    } else {
      http_response_code(424);
      exit;
    }
  }
?>