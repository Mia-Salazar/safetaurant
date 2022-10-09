<?php 
  include "../model/query.php";

  if(isset($_GET['Name'])){
    $restaurants = getRestaurants($_GET['Name'], $_GET['Province'], $_GET['FoodType']);
    if($restaurants) {
      echo json_encode($restaurants);
    } else {
      http_response_code(204);
      exit;
    }
  } else {
    http_response_code(404);
    exit;
  }
?>