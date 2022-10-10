<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['Email'])){
    $user = login($formInfo['Email'], $formInfo['Password']);
    if ($user) {
      setcookie("UserID", $user['UserID'], time() + 7200, "/");
      setcookie("UserName", $user['Name'], time() + 7200, "/");
      echo "OK";
    } else {
      http_response_code(401);
      exit;
    }
  }
?>