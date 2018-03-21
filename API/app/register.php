<?php
$app->get('/users/{id}', function($request, $response, $args){
    //$collection = (new MongoDB\Client)->smartpullupbar->users;
    $id = $args['id'];
    $collection->insertOne([
        "userid" => $id,
        "name" => "Ruben Nemes",
        "age" => 22,
        "weight" => 75,
        "pullups" => []
    ]);
});
