<?php 
  include "../model/query.php";

  if(!isset($_COOKIE['UserID'])) {
    http_response_code(401);
    exit;
  } else {
    echo "OK";
  }
?>