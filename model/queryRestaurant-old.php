<?php 

	include_once "connection.php";

	//Funcionalidad para crear un restaurante
	//Para tener el ID del restaurante recién creado y poder crear su puntuación, devolvemos ese ID si hay éxito, sino false
	function registerRestaurant($name, $province, $address, $ZIP, $phone, $foodType, $userID, $url) {
		$DDBB = createConnection();
		$sql = "INSERT INTO restaurant (name, province, address, ZIP, phone, foodType, userID, url) 
				VALUES ('" . $name . "', '" . $province . "', '" . $address . "', '" . $ZIP . "', '" . $phone . "', '" . $foodType . "', '"  . $userID . "', '"  . $url . "')";
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
	//Seleccionamos ciertos datos de los restaurantes y luego su media de puntuación general
	//Buscamos por el término que hayan metido sin importar si estaba en mayúscula o minúscula
	function getRestaurants($name, $province, $foodType, $order) {
		$DDBB = createConnection();
		if ($name == "") {
			$sql = getRestaurantWithoutName($province, $foodType, $order);
		} else {
			$sql = getRestaurantWithName($name, $province, $foodType, $order);
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

	function getRestaurantWithName($name, $province, $foodType, $order) {
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE LOWER(name) LIKE '%" . $name . "%' AND foodType = '" . $foodType. "' AND province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		}
		return $sql;
	}

	function getRestaurantWithoutName($province, $foodType, $order) {
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE foodType = '" . $foodType. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		} else {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE foodType = '" . $foodType. "' AND province = '" . $province. "' GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order . "";
		}
		return $sql;
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




	////
	
	function getRestaurants($name, $province, $foodType, $order) {
		$connection = new Connection();
		$pdo = $connection->getPdo();

		if ($name == "") {
			$stmt = getRestaurantWithoutName($province, $foodType, $order, $pdo);
		} else {
			$stmt = getRestaurantWithName($province, $foodType, $order, $pdo, $name);
			$stmt->bindValue(':name', '%' . $name . '%');
			$stmt->execute();
		}

		if ($stmt) {
			$restaurants = $stmt->fetchAll(PDO::FETCH_ASSOC);
			return $restaurants;
		} else {
			return false;
		}
	}

	function getRestaurantWithName($province, $foodType, $order, $pdo, $name) {
		$params = array();
		$whereClause = "";

		if (!empty($province)) {
			$whereClause .= " AND province = :province";
			$params[':province'] = $province;
		}

		if (!empty($foodType)) {
			$whereClause .= " AND foodType = :foodType";
			$params[':foodType'] = $foodType;
		}

		$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
				FROM restaurant 
				INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
				WHERE 1 = 1" . $whereClause . " AND LOWER(restaurant.name) LIKE :name 
				GROUP BY restaurant.restaurantID 
				ORDER BY AVG(scores.generalScore) " . $order;

		$stmt = $pdo->prepare($sql);
		foreach ($params as $param => $value) {
			$stmt->bindValue($param, $value);
		}
		$stmt->bindValue(':name', '%' . $name . '%');
		$stmt->execute();

		return $stmt;
	}

	function getRestaurantWithoutName($province, $foodType, $order, $pdo) {
		$params = array();
		$whereClause = "";

		if (!empty($province)) {
			$whereClause .= " AND province = :province";
			$params[':province'] = $province;
		}

		if (!empty($foodType)) {
			$whereClause .= " AND foodType = :foodType";
			$params[':foodType'] = $foodType;
		}

		$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE 1 = 1" . $whereClause . " GROUP BY restaurantID ORDER BY AVG(scores.generalScore) " . $order;

		$stmt = $pdo->prepare($sql);
		foreach ($params as $param => $value) {
			$stmt->bindValue($param, $value);
		}
		$stmt->execute();

		return $stmt;
	}


	//Funcionalidad para obtener la información de un restaurante por su ID
	function getRestaurant($restaurantID) {
		$connection = new Connection();
		$pdo = $connection->getPdo();
		$query = $pdo->prepare("SELECT * FROM restaurant WHERE restaurantID = :restaurantID");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($rows)) {
			return $rows[0];
		} else {
			//Si no lo encontramso devolvemos false
			return false;
		} 
		closeConnection($pdo);
	}
?>