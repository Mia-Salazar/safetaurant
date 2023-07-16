<?php 
	//Creamos una conexión con la BBDD
	function createConnection() {
		$host = "localhost";
		$user = "root";
		$pass = "";
		$DDBB = "safetaurant";
		//Nos conectamos a la BBDD con los datos indicados
		$connection = mysqli_connect($host, $user, $pass, $DDBB);
		//Si falla la conexión, devolvemos un error
		if (!$connection) {
			die("<p>Error al conectarnos con la BBDD: " . mysqli_connect_error() . "</p>");
		}
		//Devolvemos la conexión
		return $connection;
	}

	//Cerramos la conexión de la BBDD
	function closeConnection($connection) {
		mysqli_close($connection);
	}
?>