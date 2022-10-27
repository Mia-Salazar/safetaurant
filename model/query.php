<?php 

	include "connection.php";

	//Funcionalidad para crear usuario
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

	//En esta funcionalidad buscamos si un email ya está registrado y devolvemos true o false
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

	//Funcionalidad para iniciar sesión. Devolvemos el usuario si hemos tenido éxito y sino false
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

	//Funcionalidad para editar un usuario. O devolvemos el resultado o un mensaje de error
	function editUser($userID, $name, $surname, $password, $lactoseIntolerance, $celiacDisease, $allergies) {
		$DDBB = createConnection();
		//Si se ha escrito una contraseña, la modificaremos y sino no
		if($password === "") {
			$sql = "UPDATE user SET name = '" . $name . "'" .
				", surname = '" . $surname . "'" .
				", celiacDisease = '" . $celiacDisease . "'" . 
				", allergies = '" . $allergies . "'" . 
				", lactoseIntolerance =" . $lactoseIntolerance . 
				" WHERE userID =" . $userID;
		} else {
			$sql = "UPDATE user SET name = '" . $name . "'" .
			", surname = '" . $surname . "'" .
			", password = '" . $password . "'" .
			", celiacDisease = '" . $celiacDisease . "'" . 
			", allergies = '" . $allergies . "'" . 
			", lactoseIntolerance =" . $lactoseIntolerance . 
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

	//Funcionalidad para crear un restaurante
	//Para tener el ID del restaurante recién creado y poder crear su puntuación, devolvemos ese ID si hay éxito, sino false
	function registerRestaurant($name, $province, $address, $ZIP, $phone, $foodType, $userID) {
		$DDBB = createConnection();
		$sql = "INSERT INTO restaurant (name, province, address, ZIP, phone, foodType, userID) 
				VALUES ('" . $name . "', '" . $province . "', '" . $address . "', '" . $ZIP . "', '" . $phone . "', '" . $foodType . "', '"  . $userID . "')";
		$result = mysqli_query($DDBB, $sql);
		$lastID = mysqli_insert_id($DDBB);
		if ($result) {
			return $lastID;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	//Funcionalidad para obtener restaurantes
	//En función de los filtros que se hayan usado, haremos una petición u otra
	//Obtenemos ciertos datos de los restaurantes y luego su media de puntuación general
	//Buscamos por el término que hayan metido sin importar si estaba en mayúscula o minúscula
	function getRestaurants($name, $province, $foodType, $order) {
		$DDBB = createConnection();
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "' AND province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		}
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

	//Funcionalidad para añadir una nueva puntuación
	//O devolvemos el resultado o false
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

	//Funcionalidad para obtener la información de un restaurante por su ID
	function getRestaurant($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT * FROM restaurant WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			//Lo devolvemos con el formato adecuado
			$restaurant = mysqli_fetch_assoc($result);
			return $restaurant;
		} else {
			//Si no lo encontramso devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	//Funcionalidad para conocer la media de un restaurante por su ID
	function getAverage($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT AVG(generalScore) as generalScore, AVG(allergenChart) as allergenChart, AVG(fidelityScore) as fidelityScore, AVG(attentionScore) as attentionScore FROM scores WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			//Lo devolvemos con el formato adecuado
			$scores = mysqli_fetch_assoc($result);
			return $scores;
		} else {
			//Si no lo encontramso devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

	//Funcionalidad para obtener todas las puntuaciones de un restaurante
	function getScores($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT * FROM scores WHERE restaurantID ='" . $restaurantID . "'";
		$result = mysqli_query($DDBB, $sql);

		if (mysqli_num_rows($result) > 0) {
			//Creamos un array con los resultados y lo devolvemos
			$scores = array();
		    while ($resultsrows = mysqli_fetch_assoc($result)) {
		      $scores[] = $resultsrows;
		    }
			return $scores;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		} 
		closeConnection($DDBB);
	}

?>