<?php 

	include_once "connection.php";

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
		closeConnection($connection);
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
		closeConnection($connection);
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
		closeConnection($connection);
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
		closeConnection($connection);
	}
?>