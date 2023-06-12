<?php
  //Esta funcionalidad la usamos para que el usuario salga
  //Borramos las cookies
  session_start();
  unset($_SESSION['uid']);
  session_unset();
  session_destroy();
  //Devolvemos el error 401
  http_response_code(401);
  exit;
?>