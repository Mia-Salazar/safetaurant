<?php
    include "../model/queryPerson.php";
    require_once '../google-api-php-client/vendor/autoload.php';
    require_once 'user-google.php';
    
    $client_id = "276837291915-d0k06btbho776nl1orhe8luorjfsq4po.apps.googleusercontent.com";
    $id_token = $_POST['response'];
    $client = new Google_Client(['client_id' => $client_id]);
    $payload = $client->verifyIdToken($id_token); // verify JWT token received
    
    if ($payload) {
        $db = new DB();
        // send user data to the database
        $db->upsert_user($payload);
        // set user id in session aka log in the user
        if(!isset($_COOKIE['userID'])) {
            $user = getUser($payload['sub']);
            setcookie("userID", $user['id'], time() + 7200, "/", NULL);
        }
        
        echo 'success';
    } else {
        echo 'Invalid Token';
    }
?>