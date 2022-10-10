<?php 
  unset($_COOKIE['UserID']);
  unset($_COOKIE['UserName']);
  setcookie('UserID', false, -1, "/");
  setcookie('UserName', false, -1, "/");
  echo $_COOKIE['UserID'];
  http_response_code(401);
  exit;
?>