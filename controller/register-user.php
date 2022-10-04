<?php 
  include "../model/query.php";

  $formInfo = json_decode(file_get_contents("php://input"), true);
  if(isset($formInfo['Email'])){
    $isUnique = checkUniqueEmail($formInfo['Email']);
    if ($isUnique) {
      $data = registerUser($formInfo['Name'], $formInfo['Email'], $formInfo['BirthDate'], $formInfo['Password'], $formInfo['Surname'], $formInfo['LactoseIntolerance'], $formInfo['CeliacDisease'], $formInfo['Allergies']);
      if($data) {
        echo "OK";
      } else {
        echo "Hubo un error al crear el usuario";
      };
    } else {
      echo "Este usuario ya está registrado";
    }
  }
?>