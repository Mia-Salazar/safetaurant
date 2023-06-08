<?php
  session_start();
    
  if(isset($_SESSION['uid'])) {
    echo "OK";
    header('Location: http://localhost/SafeTaurant/index.html');
  } else  {
    http_response_code(401);
    exit;
  }
?>