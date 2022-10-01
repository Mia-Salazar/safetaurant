<?php 
	function createConnection() {
		$host = "localhost";
		$user = "root";
		$pass = "";
		$DDBB = "safetaurant";
		$connection = mysqli_connect($host, $user, $pass, $DDBB);
		if (!$connection) {
			die("<p>Error when connection to DDBB: " . mysqli_connect_error() . "</p>");
		}
		return $connection;
	}


	function closeConnection($connection) {
		mysqli_close($connection);
	}
?>