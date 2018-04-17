<?php
$app->post('/pullups', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $pullupS = array('$set' => array($_POST['timestamp'] => [
        "amount" => $_POST['amount'],
        "duration" => $_POST['duration'],
        "avgspeed" => $_POST['avgspeed'],
        "weight" => $_POST['weight'],
        "completion" => $_POST['completion'],
        "goal" => $_POST['goal']
    ]));
    var_dump($pullupS);
    try {
        $collection->updateOne(array("userid" => $id), $pullupS);
    } catch (Exeception $e) {
        var_dump($e);
    }
});