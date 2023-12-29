<?php 

	include_once "connection.php";

	//Funcionalidad para añadir una nueva puntuación
	//O devolvemos el resultado o false
	function addScore($comment, $generalScore, $allergenChart, $fidelityScore, $attentionScore, $userName, $userID, $restaurantID, $today, $allergicReaction) {
		$connection = new Connection();
		$sql = "INSERT INTO scores (comment, created, generalScore, allergenChart, fidelityScore, attentionScore, userName, userID, restaurantID, allergicReaction) 
				VALUES (:comment, :today, :generalScore, :allergenChart, :fidelityScore, :attentionScore, :userName, :userID, :restaurantID, :allergicReaction)";
		$query = $connection->prepare($sql);
		$query->bindParam(':comment',$comment);
		$query->bindParam(':today', $today);
		$query->bindParam(':generalScore', $generalScore);
		$query->bindParam(':allergenChart', $allergenChart);
		$query->bindParam(':fidelityScore', $fidelityScore);
		$query->bindParam(':attentionScore', $attentionScore);
		$query->bindParam(':userName', $userName);
		$query->bindParam(':userID', $userID);
		$query->bindParam(':restaurantID', $restaurantID);
		$query->bindParam(':allergicReaction', $allergicReaction);
		$query->execute();
		$lastInsertId = $connection->lastInsertId();
		if ($lastInsertId>0) {
			return $lastInsertId;
		} else {
			return false;
		}
		closeConnection($connection);
	}

	function addOptions($celiacDisease, $diabetes, $lactoseIntolerant, $fructoseIntolerant, $vegan, $vegetarian, $restaurantID, $userID, $accesibleMenu, $accesibleTable, $accesibleParking, $accesibleBathroom) {
		$connection = new Connection();
		$sql = "INSERT INTO menuOptions (celiacDisease, diabetes, lactoseIntolerant, fructoseIntolerant, vegan, vegetarian, restaurantID, userID, accesibleMenu, accesibleTable, accesibleParking, accesibleBathroom) 
				VALUES (:celiacDisease, :diabetes, :lactoseIntolerant, :fructoseIntolerant, :vegan, :vegetarian, :restaurantID, :userID, :accesibleMenu, :accesibleTable, :accesibleParking, :accesibleBathroom)";
		$query = $connection->prepare($sql);
		$query->bindParam(':celiacDisease',$celiacDisease);
		$query->bindParam(':diabetes', $diabetes);
		$query->bindParam(':lactoseIntolerant', $lactoseIntolerant);
		$query->bindParam(':fructoseIntolerant', $fructoseIntolerant);
		$query->bindParam(':vegan', $vegan);
		$query->bindParam(':vegetarian', $vegetarian);
		$query->bindParam(':restaurantID', $restaurantID);
		$query->bindParam(':userID', $userID);
		$query->bindParam(':accesibleMenu', $accesibleMenu);
		$query->bindParam(':accesibleTable', $accesibleTable);
		$query->bindParam(':accesibleParking', $accesibleParking);
		$query->bindParam(':accesibleBathroom', $accesibleBathroom);
		$query->execute();
		$lastInsertId = $connection->lastInsertId();
		if ($lastInsertId>0) {
			return $lastInsertId;
		} else {
			return false;
		}
		closeConnection($connection);
	}

	//Funcionalidad para conocer la media de un restaurante por su ID
	function getAverage($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT COUNT(*) as totalReviews, AVG(generalScore) as generalScore, AVG(fidelityScore) as fidelityScore, 
		AVG(attentionScore) as attentionScore FROM scores WHERE restaurantID = :restaurantID");
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

	//Recuperamos el número de cartas de alérgenos que se han registrado
	function getNumberOfCharts($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT COUNT(*) as chartsFound FROM scores WHERE restaurantID = :restaurantID AND allergenChart > 0");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows; 
		closeConnection($connection);
	}

	//Recuperamos el número de reacciones alérgicas que se han tenido
	function getNumberOfAllergicReactions($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT COUNT(*) as allergicReactions FROM scores WHERE restaurantID = :restaurantID AND allergicReaction > 0");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows; 
		closeConnection($connection);
	}

	//Funcionalidad para obtener todas las puntuaciones de un restaurante
	function getScores($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT * FROM scores WHERE restaurantID = :restaurantID AND comment <> '' ");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
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

	function getScoresNumber($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT COUNT(*) as scoreNumber FROM scores WHERE restaurantID = :restaurantID");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows; 
		closeConnection($connection);
	}

	function getOptionsNumber($restaurantID) {
		$connection = new Connection();
		$query = $connection->prepare("SELECT COUNT(CASE WHEN menuOptions.celiacDisease = 0 THEN 1 END) as celiacDiseaseYes, 
		COUNT(CASE WHEN menuOptions.celiacDisease = 1 THEN 1 END) as celiacDiseaseNo, 
		COUNT(CASE WHEN menuOptions.diabetes = 0 THEN 1 END) as diabetesYes, 
		COUNT(CASE WHEN menuOptions.diabetes = 1 THEN 1 END) as diabetesNo, 
		COUNT(CASE WHEN menuOptions.accesibleMenu = 0 THEN 1 END) as accesibleMenuYes, 
		COUNT(CASE WHEN menuOptions.accesibleMenu = 1 THEN 1 END) as accesibleMenuNo, 
		COUNT(CASE WHEN menuOptions.accesibleTable = 0 THEN 1 END) as accesibleTableYes, 
		COUNT(CASE WHEN menuOptions.accesibleTable = 1 THEN 1 END) as accesibleTableNo, 
		COUNT(CASE WHEN menuOptions.accesibleParking = 0 THEN 1 END) as accesibleParkingYes, 
		COUNT(CASE WHEN menuOptions.accesibleParking = 1 THEN 1 END) as accesibleParkingNo, 
		COUNT(CASE WHEN menuOptions.accesibleBathroom = 0 THEN 1 END) as accesibleBathroomYes, 
		COUNT(CASE WHEN menuOptions.accesibleBathroom = 1 THEN 1 END) as accesibleBathroomNo, 
		COUNT(CASE WHEN menuOptions.lactoseIntolerant = 0 THEN 1 END) as lactoseIntolerantYes, 
		COUNT(CASE WHEN menuOptions.lactoseIntolerant = 1 THEN 1 END) as lactoseIntolerantNo, 
		COUNT(CASE WHEN menuOptions.fructoseIntolerant = 0 THEN 1 END) as fructoseIntolerantYes, 
		COUNT(CASE WHEN menuOptions.fructoseIntolerant = 1 THEN 1 END) as fructoseIntolerantNo, 
		COUNT(CASE WHEN menuOptions.vegan = 0 THEN 1 END) as veganYes, 
		COUNT(CASE WHEN menuOptions.vegan = 1 THEN 1 END) as veganNo, 
		COUNT(CASE WHEN menuOptions.vegetarian = 0 THEN 1 END) as vegetarianYes, 
		COUNT(CASE WHEN menuOptions.vegetarian = 1 THEN 1 END) as vegetarianNo FROM menuOptions WHERE restaurantID = :restaurantID");
		$query->bindParam(":restaurantID", $restaurantID, PDO::PARAM_INT);
		$query->execute();
		$rows = $query->fetchAll(PDO::FETCH_ASSOC);

		return $rows; 
		closeConnection($connection);
	}

?>