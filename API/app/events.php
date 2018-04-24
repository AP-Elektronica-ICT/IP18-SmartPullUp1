<?php
$app->post('/events', function($request, $response, $args){
    $collection = (new MongoDB\Client)->smartpullupbar->users;
    $allVars = $request->getParsedBody();
    $pullupS = array('$addToSet' => array( 'events' => [ 
        "title" => $allVars['title'],
        "starttime" => (int)$allVars['starttime'],
        "endtime" => (int)$allVars['endtime'],
        "allday" => $allVars['allday']
        ]));
    try {
        $collection->updateOne(array("userid" => $allVars['userid']), $pullupS);
        echo "data is verstuurd";
    } catch (Exeception $e) {
        var_dump($e);
    }
});