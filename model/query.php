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
			return false;
		} 
		closeConnection($DB);
	}

	function checkUniqueEmail($Email) {
		$DDBB = createConnection();
		$sql = "SELECT UserID FROM user WHERE Email = '" . $Email . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			return false;
		} else {
			return true;
		} 
		closeConnection($DB);
	}

	function login($Email, $Password) {
		$DDBB = createConnection();
		$sql = "SELECT UserID, Name FROM user WHERE Email ='" . $Email . "' AND Password = '" . $Password. "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

	function getUser($UserID) {
		$DDBB = createConnection();
		$sql = "SELECT BirthDate, CeliacDisease, Email, LactoseIntolerance, Name, Surname, Allergies FROM user WHERE UserID ='" . $UserID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$user = mysqli_fetch_assoc($result);
			return $user;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

	function editUser($UserID, $Name, $Surname, $Password, $LactoseIntolerance, $CeliacDisease, $Allergies) {
		$DDBB = createConnection();
		$sql = "UPDATE user SET Name = '" . $Name . "'" .
				", Surname = '" . $Surname . "'" .
				", Password = '" . $Password . "'" .
				", CeliacDisease = '" . $CeliacDisease . "'" . 
				", Allergies = '" . $Allergies . "'" . 
				", LactoseIntolerance =" . $LactoseIntolerance . 
				" WHERE UserID =" . $UserID;
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			echo "Error, no se pudo editar el usuario";
		}
		closeConnection($DB);
	}

	function registerRestaurant($Name, $Province, $Address, $ZIP, $Phone, $FoodType, $CCAA, $UserID) {
		$DDBB = createConnection();
		$sql = "INSERT INTO restaurant (Name, Province, Address, ZIP, Phone, FoodType, CCAA, UserID) 
				VALUES ('" . $Name . "', '" . $Province . "', '" . $Address . "', '" . $ZIP . "', '" . $Phone . "', '" . $FoodType . "', '" . $CCAA . "', '"  . $UserID . "')";
		$result = mysqli_query($DDBB, $sql);
		$lastID = mysqli_insert_id($DDBB);
		if ($result) {
			return $lastID;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

	function getRestaurants($Name, $Province, $FoodType) {
		$DDBB = createConnection();
		if ($Province == "" && $FoodType == "") {
			$sql = "SELECT restaurant.Name, restaurant.Address, restaurant.Province, averages.GeneralScore FROM restaurant INNER JOIN averages ON restaurant.RestaurantID = averages.RestaurantID WHERE Name LIKE '%" . $Name . "%'";
		} else if ($Province != "" && $FoodType == "") {
			$sql = "SELECT restaurant.Name, restaurant.Address, restaurant.Province, averages.GeneralScore FROM restaurant INNER JOIN averages ON restaurant.RestaurantID = averages.RestaurantID WHERE Name LIKE '%" . $Name . "%' AND Province = '" . $Province. "'";
		} else if ($Province == "" && $FoodType != "") {
			$sql = "SELECT restaurant.Name, restaurant.Address, restaurant.Province, averages.GeneralScore FROM restaurant INNER JOIN averages ON restaurant.RestaurantID = averages.RestaurantID WHERE Name LIKE '%" . $Name . "%' AND FoodType = '" . $FoodType. "'";
		} else {
			$sql = "SELECT restaurant.Name, restaurant.Address, restaurant.Province, averages.GeneralScore FROM restaurant INNER JOIN averages ON restaurant.RestaurantID = averages.RestaurantID WHERE Name LIKE '%" . $Name . "%' AND FoodType = '" . $FoodType. "' AND Province = '" . $Province. "'";
		}
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			$restaurants = mysqli_fetch_assoc($result);
			return $restaurants;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

	function addScore($Comment, $GeneralScore, $AllergenChart, $FidelityScore, $AttentionScore, $UserName, $UserID, $RestaurantID, $today) {
		$DDBB = createConnection();
		$sql = "INSERT INTO scores (Comment, Created, GeneralScore, AllergenChart, FidelityScore, AttentionScore, UserName, UserID, RestaurantID) 
				VALUES ('" . $Comment . "', '" . $today . "', '" . $GeneralScore . "', '" . $AllergenChart . "', '" . $FidelityScore . "', '" . $AttentionScore . "', '" . $UserName . "', '"  . $UserID . "', '"  . $RestaurantID . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

	function addAverage($RestaurantID, $GeneralScore, $AllergenChart, $FidelityScore, $AttentionScore) {
		$DDBB = createConnection();
		$sql = "INSERT INTO averages (RestaurantID, GeneralScore, AllergenChart, FidelityScore, AttentionScore) 
				VALUES ('" .  $RestaurantID . "', '" . $GeneralScore . "', '" . $AllergenChart . "', '" . $FidelityScore . "', '" . 
					$AttentionScore . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DB);
	}

?>