<?php 
	function createConnection() {
		$host = "localhost";
		$user = "root";
		$pass = "";
		$baseDatos = "safetaurant";
		$conexion = mysqli_connect($host, $user, $pass, $baseDatos);
		if (!$conexion) {
			die("<p>Error al conectar con la BBDD: " . mysqli_connect_error() . "</p>");
		}
		return $conexion;
	}


	function closeConnection($conexion) {
		mysqli_close($conexion);
	}
?>