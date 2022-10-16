<?php 

	include "connection.php";

	function registerUser($name, $email, $birthDate, $password, $surname, $lactoseIntolerance, $celiacDisease, $allergies) {
		$DDBB = createConnection();
		$sql = "INSERT INTO user (name, email, birthDate, password, surname, lactoseIntolerance, celiacDisease, allergies) 
				VALUES ('" . $name . "', '" . $email . "', '" . $birthDate . "', '" . $password . "', '" . $surname . "', '" . $lactoseIntolerance . "', '" . $celiacDisease . "', '"  . $allergies . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

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
		$DDBB = createConnection();
		$sql = "SELECT birthDate, celiacDisease, email, lactoseIntolerance, name, surname, allergies FROM user WHERE userID ='" . $userID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function editUser($userID, $name, $surname, $password, $lactoseIntolerance, $celiacDisease, $allergies) {
		$DDBB = createConnection();
		$sql = "UPDATE user SET name = '" . $name . "'" .
				", surname = '" . $surname . "'" .
				", password = '" . $password . "'" .
				", celiacDisease = '" . $celiacDisease . "'" . 
				", allergies = '" . $allergies . "'" . 
				", lactoseIntolerance =" . $lactoseIntolerance . 
				" WHERE userID =" . $userID;
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			echo "Error, no se pudo editar el usuario";
		}
		closeConnection($DDBB);
	}

	function registerRestaurant($name, $province, $address, $ZIP, $phone, $foodType, $CCAA, $userID) {
		$DDBB = createConnection();
		$sql = "INSERT INTO restaurant (name, province, address, ZIP, phone, foodType, CCAA, userID) 
				VALUES ('" . $name . "', '" . $province . "', '" . $address . "', '" . $ZIP . "', '" . $phone . "', '" . $foodType . "', '" . $CCAA . "', '"  . $userID . "')";
		$result = mysqli_query($DDBB, $sql);
		$lastID = mysqli_insert_id($DDBB);
		if ($result) {
			return $lastID;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function getRestaurants($name, $province, $foodType) {
		$DDBB = createConnection();
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%'";
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND province = '" . $province. "'";
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "'";
		} else {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "' AND province = '" . $province. "'";
		}
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$restaurants = array();
		    while ($resultsrows = mysqli_fetch_assoc($result)) {
		      $restaurants[] = $resultsrows;
		    }
			return $restaurants;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function addScore($comment, $generalScore, $allergenChart, $fidelityScore, $attentionScore, $userName, $userID, $restaurantID, $today) {
		$DDBB = createConnection();
		$sql = "INSERT INTO scores (comment, created, generalScore, allergenChart, fidelityScore, attentionScore, userName, userID, restaurantID) 
				VALUES ('" . $comment . "', '" . $today . "', '" . $generalScore . "', '" . $allergenChart . "', '" . $fidelityScore . "', '" . $attentionScore . "', '" . $userName . "', '"  . $userID . "', '"  . $restaurantID . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function getRestaurant($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT * FROM restaurant WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$restaurant = mysqli_fetch_assoc($result);
			return $restaurant;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function getAverage($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT AVG(generalScore) as generalScore, AVG(allergenChart) as allergenChart, AVG(fidelityScore) as fidelityScore, AVG(attentionScore) as attentionScore FROM scores WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$scores = mysqli_fetch_assoc($result);
			return $scores;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	function getScores($restaurantID, $returnsArray = true) {
		$DDBB = createConnection();
		$sql = "SELECT * FROM scores WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			if ($returnsArray) {
				$scores = array();
			    while ($resultsrows = mysqli_fetch_assoc($result)) {
			      $scores[] = $resultsrows;
			    }
				return $scores;
			} else {
				return mysqli_num_rows($result);
			}
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

?>