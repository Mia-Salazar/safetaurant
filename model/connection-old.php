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



	class Connection {
        private $pdo;
    
        public function __construct() {
            try {
                $type = 'mysql';

                // $host = 'localhost';
                // $database = 'safetaurant';
                // $user = 'root';
                // $pass = '';

                $host = 'db5012427505.hosting-data.io';
                $database =  'dbs10448932';
                $user = 'dbu631847';
                $pass = '*jHJ$6nA60hU';
    
                $this->pdo = new PDO($type . ':host=' . $host . ';dbname=' . $database, $user, $pass);
            } catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
            }
        }
    
        public function getPdo() {
            return $this->pdo;
        }
    }

	//Cerramos la conexión de la BBDD
	function closeConnection($connection) {
		$connection=null;
	}
?>