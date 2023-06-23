<?php
    
  if(isset($_COOKIE['userID'])) {
    echo "OK";
  } else  {
    http_response_code(401);
    exit;
  }
?>