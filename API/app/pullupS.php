<?php
$app->get('/pullups', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $id = "google-oauth2|116967247859714699456";
    
    $pullupS = array('$set' => array("timestamp" => [
        "amount" => 6,
        "duration" => 5,
        "avgspeed" => 5,
        "weight" => 180,
        "completion" => 70,
        "goal" => 20
    ]));
    var_dump($pullupS);
    try {
    $collection->updateOne(array("userid" => $id), $pullupS);
    } catch (Exeception $e) {
        var_dump($e);
    }
});