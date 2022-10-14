<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['email'])){
    $user = login($formInfo['email'], $formInfo['password']);
    if ($user) {
      setcookie("userID", $user['userID'], time() + 7200, "/");
      setcookie("userName", $user['name'], time() + 7200, "/");
      echo "OK";
    } else {
      http_response_code(401);
      exit;
    }
  }
?>