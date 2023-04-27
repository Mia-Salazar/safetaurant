<?php 

	include "connection.php";

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
?>