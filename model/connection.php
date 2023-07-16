<?php 
	//Creamos una conexión con la BBDD
	class Connection extends PDO {
        // private $type = 'mysql';
        // private $host = 'localhost';
        // private $database =  'safetaurant';
        // private $user = 'root';
        // private $pass = '';

		private $type = 'mysql';
        private $host = 'db5012427505.hosting-data.io';
        private $database =  'dbs10448932';
        private $user = 'dbu631847';
        private $pass = '*jHJ$6nA60hU';
 
        public function __construct() {
            try {
                parent::__construct($this->type . ':host=' . $this->host . ';dbname=' . $this->database, $this->user, $this->pass);
            } 
            catch (PDOException $e) {
                echo "Error: " . $e->getMessage();
            }
        }
    }

	//Cerramos la conexión de la BBDD
	function closeConnection($connection) {
		$connection=null;
	}
?>