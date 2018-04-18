<?php
$app->post('/pullups', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $postVars = $request->getParsedBody();
    $pullupS = array('$set' => array($postVars['timestamp'] => [
        "amount" => $postVars['amount'],
        "duration" => $postVars['duration'],
        "avgspeed" => $postVars['avgspeed'],
        "weight" => $postVars['weight'],
        "completion" => $postVars['completion'],
        "goal" => $postVars['goal']
    ]));
//    try {
//        $collection->updateOne(array("userid" => $id), $pullupS);
//    } catch (Exeception $e) {
//        var_dump($e);
//    }
});