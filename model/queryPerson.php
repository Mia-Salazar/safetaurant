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


	function getUser($userID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT * FROM users WHERE google_uid=:userID");
		$query->bindParam(":userID", $userID, PDO::PARAM_STR);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
	
		if (!empty($rows)) {
			return $rows;
		} else {
			return false;
		} 
		closeConnection($connection);
	}

	function getUserById($userID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT * FROM users WHERE id=:userID");
		$query->bindParam(":userID", $userID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($rows)) {
			return $rows[0];
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
		$connection = new Connection();
		$query = $connection->prepare("SELECT restaurantID, name, province FROM restaurant WHERE userID = :userID  ORDER BY name");
		$query->bindParam(":userID", $userID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($rows)) {
			return $rows;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	function getPersonComments($userID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT * FROM scores WHERE userID = :userID  ORDER BY generalScore");
		$query->bindParam(":userID", $userID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($rows)) {
			return $rows;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	function deleteComments($scoreID) {
		$connection = new Connection();
		$query = $connection->prepare("DELETE FROM scores WHERE scoreID = :scoreID");
		$query->bindParam(":scoreID", $scoreID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if ($rows) {
			return $rows;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}
?>