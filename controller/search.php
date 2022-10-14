<?php 
  include "../model/query.php";

  if(isset($_GET['name'])){
    $restaurants = getRestaurants($_GET['name'], $_GET['province'], $_GET['foodType']);
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