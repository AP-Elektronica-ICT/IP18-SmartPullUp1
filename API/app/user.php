<?php
$app->get('/users/{id}', function($request, $response, $args){
    //$collection = (new MongoDB\Client)->smartpullupbar->users;
    $id = $args['id'];
    $document = $collection->findOne(
            ['id' => $id]
    );
    echo $document;
});
