<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($_COOKIE['UserID'])) {
    $data = registerRestaurant($formInfo['Name'], $formInfo['Province'], $formInfo['Address'],  $formInfo['ZIP'], $formInfo['Phone'], $formInfo['FoodType'], $formInfo['CCAA'], $_COOKIE['UserID']);
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
    $score = addScore($formInfo['Comment'], $formInfo['GeneralScore'], $formInfo['AllergenChart'],  $formInfo['FidelityScore'], $formInfo['AttentionScore'], $_COOKIE['UserName'], $_COOKIE['UserID'], $data, $formInfo['Created']);
    if($score) {
      createAverage($data, $formInfo);
    } else {
      http_response_code(424);
      exit;
    }
  }

  function createAverage($data, $formInfo) {
    $average = addAverage($data, $formInfo['GeneralScore'], $formInfo['AllergenChart'],  $formInfo['FidelityScore'], $formInfo['AttentionScore']);
    if($average) {
      echo "OK";
    } else {
      http_response_code(424);
      exit;
    }
  }
?>