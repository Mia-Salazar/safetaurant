<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['Email'])){
    $userID = login($formInfo['Email'], $formInfo['Password']);
    if ($userID) {
      setcookie("UserID", $userID, time() + 7200, "/");
      echo "OK";
    } else {
      echo "El email o la contraseña son incorrectos";
    }
  }
?>