<?php 

	include_once "connection.php";

	//Funcionalidad para crear un restaurante
	//Para tener el ID del restaurante recién creado y poder crear su puntuación, devolvemos ese ID si hay éxito, sino false
	function registerRestaurant($name, $province, $address, $ZIP, $phone, $foodType, $userID, $url, $latitude, $longitude, $apiID) {
		$connection = new Connection();
		$sql = "INSERT INTO restaurant (name, province, address, ZIP, phone, foodType, userID, url, latitude, longitude, apiID) 
				VALUES (:name, :province, :address, :ZIP, :phone, :foodType, :userID,  :url, :latitude, :longitude, :apiID)";
		$query = $connection->prepare($sql);
		$query->bindParam(':name',$name);
		$query->bindParam(':province', $province);
		$query->bindParam(':address', $address);
		$query->bindParam(':ZIP', $ZIP);
		$query->bindParam(':phone', $phone);
		$query->bindParam(':foodType', $foodType);
		$query->bindParam(':userID', $userID);
		$query->bindParam(':url', $url);
		$query->bindParam(':latitude', $latitude);
		$query->bindParam(':longitude', $longitude);
		$query->bindParam(':apiID', $apiID);
		$query->execute();
		$lastInsertId = $connection->lastInsertId();
		if ($lastInsertId>0) {
			return $lastInsertId;
		} else {
			return false;
		} 
		closeConnection($connection);
	}

	function editRestaurant($name, $province, $address, $ZIP, $phone, $foodType, $url, $restaurantID) {
		$connection = new Connection();
		$sql = "UPDATE restaurant SET name = :name, province = :province, address = :address, ZIP = :ZIP, phone = :phone, foodType = :foodType, url = :url WHERE restaurantID = :restaurantID";
		$query = $connection->prepare($sql);
		$query->bindParam(':name',$name);
		$query->bindParam(':province', $province);
		$query->bindParam(':address', $address);
		$query->bindParam(':ZIP', $ZIP);
		$query->bindParam(':phone', $phone);
		$query->bindParam(':foodType', $foodType);
		$query->bindParam(':url', $url);
		$query->bindParam(':restaurantID', $restaurantID);
		if ($query->execute()) {
			return true;
		} else {
			return false;
		} 
		closeConnection($connection);
	}

	function getRestaurants($name, $province, $foodType, $order, $offset) {
		$connection = new Connection();
		if ($name == "") {
			$rows = getRestaurantWithoutName($province, $foodType, strtoupper($order), $connection, $offset);
		} else {
			$rows = getRestaurantWithName($name, $province, $foodType, strtoupper($order), $connection, $offset);
		}

		if (!empty($rows)) {
			return $rows;
		} else {
			//Si ha habido algún error devolvemos false
			return false;
		}
	}

	function getLatestRestaurant() {
		$connection = new Connection();
		$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
		FROM restaurant 
		INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
		ORDER BY AVG(scores.generalScore) ASC LIMIT 10 OFFSET :offset";
		$query = $connection->prepare($sql);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows; 
		closeConnection($connection);
	}

	function getRestaurantWithName($name, $province, $foodType, $order, $connection, $offset) {
		$allowedOrders = array('ASC', 'DESC');
		$order = strtoupper($order); // Convertir a mayúsculas para que coincida con las opciones permitidas
		if (!in_array($order, $allowedOrders)) {
			$order = 'DESC';
		}
		$order = strtoupper($order);
		$rows;
		$name = '%' . strtolower($name) . '%'; 
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE LOWER(name) LIKE :name 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE LOWER(name) LIKE :name AND 
			province = :province 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':province', $province);
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE LOWER(name) LIKE :name AND 
			foodType = :foodType 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':foodType', $foodType);
		} else {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE LOWER(name) LIKE :name AND 
			province = :province AND 
			foodType = :foodType 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':province', $province);
			$query->bindParam(':foodType', $foodType);
		}
		$query->bindParam(':offset', $offset, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($connection); 
		return $rows;
	}

	function getRestaurantWithoutName($province, $foodType, $order, $connection, $offset) {
		$allowedOrders = array('ASC', 'DESC');
		$order = strtoupper($order); // Convertir a mayúsculas para que coincida con las opciones permitidas
		if (!in_array($order, $allowedOrders)) {
			$order = 'DESC';
		}
		$order = strtoupper($order);
		$rows;
		if ($province == "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE province = :province 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':province', $province);
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE foodType = :foodType 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':foodType', $foodType);
		} else {
			//$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE foodType = :foodType AND province = :province GROUP BY restaurantID ORDER BY AVG(scores.generalScore) ";
			$sql = "SELECT restaurant.restaurantID, restaurant.name, restaurant.address, restaurant.province, AVG(scores.generalScore) as generalScore 
            FROM restaurant 
            INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID 
            WHERE foodType = :foodType AND province = :province 
            GROUP BY restaurantID 
            ORDER BY AVG(scores.generalScore) $order LIMIT 10 OFFSET :offset";
			$query = $connection->prepare($sql);
			$query->bindParam(':foodType', $foodType);
			$query->bindParam(':province', $province);
		}
		$query->bindParam(':offset', $offset, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($connection); 
		return $rows;
	}

	//Funcionalidad para obtener la información de un restaurante por su ID
	function getRestaurant($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT * FROM restaurant WHERE restaurantID = :restaurantID");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		if (!empty($rows)) {
			return $rows[0];
		} else {
			//Si no lo encontramso devolvemos false
			return false;
		} 
		closeConnection($connection);
	}


	// Total
	function getRestaurantsTotal($name, $province, $foodType) {
		$connection = new Connection();
		if ($name == "") {
			$rows = getRestaurantWithoutNameTotal($province, $foodType, $connection);
		} else {
			$rows = getRestaurantWithNameTotal($name, $province, $foodType, $connection);
		}
		return $rows;
	}

	function getRestaurantWithNameTotal($name, $province, $foodType, $connection) {
		$rows;
		$name = '%' . strtolower($name) . '%'; 
		if ($province == "" && $foodType == "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE LOWER(name) LIKE :name";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE LOWER(name) LIKE :name AND 
			province = :province";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':province', $province);
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE LOWER(name) LIKE :name AND 
			foodType = :foodType";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':foodType', $foodType);
		} else {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE LOWER(name) LIKE :name AND 
			province = :province AND 
			foodType = :foodType";
			$query = $connection->prepare($sql);
			$query->bindParam(':name', $name);
			$query->bindParam(':province', $province);
			$query->bindParam(':foodType', $foodType);
		}
		$query->execute();
		$rows = $query->fetch();
		closeConnection($connection); 
		return $rows;
	}

	function getRestaurantWithoutNameTotal($province, $foodType, $connection) {
		$rows;
		if ($province == "" && $foodType == "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant";
			$query = $connection->prepare($sql);
		} else if ($province != "" && $foodType == "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE province = :province";
			$query = $connection->prepare($sql);
			$query->bindParam(':province', $province);
		} else if ($province == "" && $foodType != "") {
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE foodType = :foodType";
			$query = $connection->prepare($sql);
			$query->bindParam(':foodType', $foodType);
		} else {
			//$sql = "SELECT count(*) as total FROM restaurant INNER JOIN scores ON restaurant.restaurantID = scores.restaurantID WHERE foodType = :foodType AND province = :province GROUP BY restaurantID ORDER BY AVG(scores.generalScore) ";
			$sql = "SELECT count(*) as total 
            FROM restaurant 
            WHERE foodType = :foodType AND province = :province";
			$query = $connection->prepare($sql);
			$query->bindParam(':foodType', $foodType);
			$query->bindParam(':province', $province);
		}
		$query->execute();
		$rows = $query->fetch();
		closeConnection($connection); 
		return $rows;
	}

	// Search names before adding
	function getRestaurantsNames($name, $province) {
		$connection = new Connection();
		$name = '%' . strtolower($name) . '%'; 
		$sql = "SELECT name, restaurantID  
		FROM restaurant 
		WHERE LOWER(name) LIKE :name AND 
		province = :province 
		ORDER BY name DESC";

		$query = $connection->prepare($sql);
		$query->bindParam(':name', $name);
		$query->bindParam(':province', $province);
		$query->execute();

		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($connection); 
		return $rows;
	}

	//Search restaurant by latitude and longitude to check duplicates
	function getRestaurantsByAddress($name, $latitude, $longitude) {
		$connection = new Connection();
		$name = '%' . strtolower($name) . '%'; 
		$sql = "SELECT name, restaurantID  
		FROM restaurant 
		WHERE LOWER(name) LIKE :name AND 
		latitude = :latitude AND
		longitude = :longitude
		ORDER BY name DESC";

		$query = $connection->prepare($sql);
		$query->bindParam(':name', $name);
		$query->bindParam(':latitude', $latitude);
		$query->bindParam(':longitude', $longitude);
		$query->execute();

		$rows = $query->fetchAll(PDO::FETCH_ASSOC);
		closeConnection($connection); 
		return $rows;
	}
?>