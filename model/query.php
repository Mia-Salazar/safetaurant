<?php 

	include "connection.php";

	function registerUser($Name, $Email, $BirthDate, $Password, $Surname, $LactoseIntolerance, $CeliacDisease, $Allergies) {
		$DDBB = createConnection();

		$sql = "INSERT INTO user (Name, Email, BirthDate, Password, Surname, LactoseIntolerance, CeliacDisease, Allergies) 
				VALUES ('" . $Name . "', '" . $Email . "', '" . $BirthDate . "', '" . $Password . "', '" . $Surname . "', '" . $LactoseIntolerance . "', '" . $CeliacDisease . "', '"  . $Allergies . "')";

		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			echo "Error when creating an user.";
		} 
		mysqli_close($DB);
	}

?>