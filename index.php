<?php
  if(isset($_COOKIE['UserID'])) {
    header("Location: http://localhost/TFG/view/index.html");
    die();
  } else {
    header("Location: http://localhost/TFG/view/login.html");
    die();
  }
?>