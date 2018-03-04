<?php
$app->get('/users', function(){
    // connect
    $m = new MongoClient();
    // select your database
        $db = $m->smartpullupbar;
    // select your collection
        $collection = $db->users;
    // add a record
        $json = '{
      "userid": "hjkdh32jhjfshjdsfk",
      "name": "Ruben Nemes",
      "age": 22,
      "weight": 75,
      "pullups": {
        "1520182860": {
          "pullup1": [
            4.9,
            6.1
          ],
          "pullup2": [
            8.4,
            9.3
          ],
          "pullup3": [
            11.7,
            12.9
          ],
          "pullup4": [
            18.4,
            19
          ]
        }
      }
    }';
        $document = json_decode($json);
        $collection->insert($document);
});
