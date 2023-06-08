<?php
    class DB {
        private $dbHost     = "localhost";
        private $dbUsername = "root";
        private $dbPassword = "";
        private $dbName     = "safetaurant";
    
        public function __construct(){
            if(!isset($this->db)){
                // Connect to the database
                $conn = new mysqli($this->dbHost, $this->dbUsername, $this->dbPassword, $this->dbName);
                if($conn->connect_error){
                    die("Failed to connect with MySQL: " . $conn->connect_error);
                }else{
                    $this->db = $conn;
                }
            }
        }
    
        public function get_user($id) {
            $sql = $this->db->query("SELECT * FROM users WHERE google_uid = '$id'");
            return $sql->fetch_assoc();
        }
    
        public function upsert_user($arr_data = array()) {
            $uid = $this->db->real_escape_string($arr_data['sub']);
            $name = $this->db->real_escape_string($arr_data['name']);
            $email = $this->db->real_escape_string($arr_data['email']);
            $picture = $this->db->real_escape_string($arr_data['picture']);
    
            // check if user exists by fetching it's details
            $user = $this->get_user($uid);
    
            if(!$user) {
                // insert the user
                $sql = sprintf("INSERT INTO users(google_uid, name, email, picture) VALUES('%s', '%s', '%s', '%s')", $uid, $name, $email, $picture);
                $this->db->query($sql);
            } else {
                // update the user
                $sql = sprintf("UPDATE users SET name = '%s', email = '%s', picture = '%s' WHERE google_uid = '%s'", $name, $email, $picture, $uid);
                $this->db->query($sql);
            }
        }
    }
?>