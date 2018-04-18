<?php
$app->get('/users/{id}', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $id = $args['id'];
    echo $id;
    $collection->insertOne([
        "userid" => "google-oauth2|116967247859714699456",
        "name" => "Ruben Nemes",
        "age" => 22,
        "weight" => 75,
        "pullups" => [
            "1520182860" => [
                "pullup1" => [
                   4.9,
                   6.1 
                ],
                "pullup2" => [
                   8.4,
                   9.3 
                ],
                "pullup3" => [
                   11.7,
                   12.9 
                ],
                "pullup4" => [
                   18.4,
                   19 
                ]
            ]
        ]
    ]);
});
