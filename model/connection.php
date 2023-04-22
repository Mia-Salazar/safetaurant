<?php 
	//Creamos una conexión con la BBDD
	function createConnection() {
		$host_name = 'db5012427505.hosting-data.io';
		$database = 'dbs10448932';
		$user_name = 'dbu631847';
		$password = '*jHJ$6nA60hU';
	  
		$connection = new mysqli($host_name, $user_name, $password, $database);
	  
		if ($connection->connect_error) {
		  die('<p>Error al conectar con servidor MySQL: '. $connection->connect_error .'</p>');
		}
		//Devolvemos la conexión
		return $connection;
	}

	//Cerramos la conexión de la BBDD
	function closeConnection($connection) {
		mysqli_close($connection);
	}
?>