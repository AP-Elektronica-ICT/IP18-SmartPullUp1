<?php
$app->post('/pullups', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $allVars = $request->getParsedBody();
    $pullupS = array('$addToSet' => array( 'pullups' => [ 
        "timestamp" => (int)$allVars['timestamp'],
        "amount" => (int)$allVars['amount'],
        "duration" => (int)$allVars['duration'],
        "avgspeed" => (int)$allVars['avgspeed'],
        "weight" => (int)$allVars['weight'],
        "completion" => (int)$allVars['completion'],
        "goal" => (int)$allVars['goal']
        ]));
    var_dump($allVars);
    var_dump($pullupS);
    try {
        $collection->updateOne(array("userid" => $allVars['userid']), $pullupS);
        echo "data is verstuurd";
    } catch (Exeception $e) {
        var_dump($e);
    }
});