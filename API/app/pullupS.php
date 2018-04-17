<?php
$app->get('/pullups', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    
    var_dump($POST);
});