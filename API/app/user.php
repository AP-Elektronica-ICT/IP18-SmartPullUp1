<?php
$app->get('/user/{id}', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $id = $args['id'];
    $document = $collection->findOne(
            ['userid' => $id]
    );
    header('Content-Type: application/json');
    echo json_encode($document);
});
