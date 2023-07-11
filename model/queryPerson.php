<?php 

	include_once "connection.php";

	//Funcionalidad para crear usuario
	function registerUser($name, $email, $birthDate, $password, $surname) {
		$DDBB = createConnection();
		$sql = "INSERT INTO user (name, email, birthDate, password, surname) 
				VALUES ('" . $name . "', '" . $email . "', '" . $birthDate . "', '" . $password . "', '" . $surname . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	//Deprecada desde login con Google
	function checkUniqueEmail($email) {
		$DDBB = createConnection();
		$sql = "SELECT userID FROM user WHERE email = '" . $email . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			return false;
		} else {
			return true;
		} 
		closeConnection($DDBB);
	}

	//Deprecada desde login con Google
	function login($email, $password) {
		$DDBB = createConnection();
		$sql = "SELECT userID, name FROM user WHERE email ='" . $email . "' AND password = '" . $password. "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	//Funcionalidad para obtener un usuario por ID
	//Devolvemos el usuario o false
	function getUser($userID) {
		$DDBB = createConnection();
		$sql = "SELECT email, name, picture, id FROM users WHERE google_uid ='" . $userID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function getUserById($userID) {
		$DDBB = createConnection();
		$sql = "SELECT email, name, picture, id FROM users WHERE id ='" . $userID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	//Deprecada desde login con Google
	function editUser($userID, $name, $surname, $password) {
		$DDBB = createConnection();
		//Si se ha escrito una contraseña, la modificaremos y sino no
		if($password === "") {
			$sql = "UPDATE user SET name = '" . $name . "'" .
				", surname = '" . $surname . "'" .
				" WHERE userID =" . $userID;
		} else {
			$sql = "UPDATE user SET name = '" . $name . "'" .
			", surname = '" . $surname . "'" .
			", password = '" . $password . "'" .
			" WHERE userID =" . $userID;	
		}

		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			echo "Error, no se pudo editar el usuario";
		}
		closeConnection($DDBB);
	}

	function getPersonRestaurants($userID) {
		$DDBB = createConnection();
		$sql = "SELECT restaurantID, name, province FROM restaurant WHERE userID ='" . $userID . "' ORDER BY name";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			//Creamos un array con los resultados y lo devolvemos
			$restaurants = array();
		    while ($resultsrows = mysqli_fetch_assoc($result)) {
		      $restaurants[] = $resultsrows;
		    }
			return $restaurants;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	function getPersonComments($userID) {
		$DDBB = createConnection();
		$sql = "SELECT * FROM scores WHERE userID ='" . $userID . "' ORDER BY generalScore";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			//Creamos un array con los resultados y lo devolvemos
			$restaurants = array();
		    while ($resultsrows = mysqli_fetch_assoc($result)) {
		      $restaurants[] = $resultsrows;
		    }
			return $restaurants;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	function deleteComments($scoreID) {
		$DDBB = createConnection();
		$sql = "DELETE FROM scores WHERE scoreID ='" . $scoreID . "'";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}
?>