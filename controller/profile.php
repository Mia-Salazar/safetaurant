<?php 
  include "../model/query.php";

  if(isset($_COOKIE['UserID'])) {
    $user = getUser($_COOKIE['UserID']);
    if($user) {
      echo json_encode($user);
    } else {
      http_response_code(400);
      exit;
    }
  } else {
    http_response_code(401);
    exit;
  }
?>