<?php 

	include_once "connection.php";

	//Funcionalidad para añadir una nueva puntuación
	//O devolvemos el resultado o false
	function addScore($comment, $generalScore, $allergenChart, $fidelityScore, $attentionScore, $userName, $userID, $restaurantID, $today, $allergicReaction) {
		$DDBB = createConnection();
		$sql = "INSERT INTO scores (comment, created, generalScore, allergenChart, fidelityScore, attentionScore, userName, userID, restaurantID, allergicReactio) 
				VALUES ('" . $comment . "', '" . $today . "', '" . $generalScore . "', '" . $allergenChart . "', '" . $fidelityScore . "', '" . $attentionScore . "', '" . $userName . "', '"  . $userID . "', '"  . $restaurantID . "', '"  . $allergicReactio . "')";
		$result = mysqli_query($DDBB, $sql);

		if ($result) {
			return $result;
		} else {
			return false;
		} 
		closeConnection($DDBB);
	}

	//Funcionalidad para conocer la media de un restaurante por su ID
	function getAverage($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT COUNT(*) as totalReviews, AVG(generalScore) as generalScore, AVG(fidelityScore) as fidelityScore, 
		AVG(attentionScore) as attentionScore FROM scores WHERE restaurantID ='" . $restaurantID . "'";
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

	//Recuperamos el número de cartas de alérgenos que se han registrado
	function getNumberOfCharts($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT COUNT(*) as chartsFound FROM scores WHERE restaurantID ='" . $restaurantID . "' AND allergenChart > 0";
		$result = mysqli_query($DDBB, $sql);

		return mysqli_fetch_assoc($result); 
		closeConnection($DDBB);
	}

	//Recuperamos el número de reacciones alérgicas que se han tenido
	function getNumberOfAllergicReactions($restaurantID) {
		$DDBB = createConnection();
		$sql = "SELECT COUNT(*) as allergicReactions FROM scores WHERE restaurantID ='" . $restaurantID . "' AND allergicReaction > 0";
		$result = mysqli_query($DDBB, $sql);

		return mysqli_fetch_assoc($result); 
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