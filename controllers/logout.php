<?php
  //Esta funcionalidad la usamos para que el usuario salga
  //Borramos las cookies
  unset($_COOKIE['userID']);
  setcookie('userID', false, -1, "/");
  //Devolvemos el error 401
  http_response_code(401);
  exit;
?>