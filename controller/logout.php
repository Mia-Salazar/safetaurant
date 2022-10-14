<?php 
  unset($_COOKIE['userID']);
  unset($_COOKIE['userName']);
  setcookie('userID', false, -1, "/");
  setcookie('userName', false, -1, "/");
  echo $_COOKIE['userID'];
  http_response_code(401);
  exit;
?>