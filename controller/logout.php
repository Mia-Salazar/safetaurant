<?php
  //Esta funcionalidad la usamos para que el usuario salga
  //Borramos las cookies
  unset($_COOKIE['userID']);
  unset($_COOKIE['userName']);
  setcookie('userID', false, -1, "/");
  setcookie('userName', false, -1, "/");
  //Devolvemos el error 401
  http_response_code(401);
  exit;
?>