<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;

require_once('../app/users.php');   

$app->run();



//function showData()
//{
//// connect
//    $m = new MongoClient();
//// select your database
//    $db = $m->dbname;
//// select your collection
//    $collection = $db->collectionname;
//// find everything in the collection
//    $cursor = $collection->find();
//// Show the result here
//    foreach ($cursor as $document) {
//        echo $document["title"] . "\n";
//    }
//}