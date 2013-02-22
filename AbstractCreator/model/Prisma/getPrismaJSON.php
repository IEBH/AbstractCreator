<?php 
header('Content-Type: application/json');
/*
 * This file outputs the data as json that is used in the prisma grid in javascript.
 * To open this file, use: http://localhost/crebp2/model/Prisma/getPrismaJSON.php.
 * Currently these are static rows as can be seen below, but by connecting this script to a mysql database,
 * you could persist and retrieve thsi data permanently.
 * 
 * Example output:
{
"success":true,
"total":3,
"prismas":[
            {
            "displayText":"In order to add one or more patients or diseases, click the green +. ",
            "groupDisplayText":"1. Patients \/ Disease",
            "id":1,
            "group_id":"Disease",
            "isDummy":true
            },
            {
            "displayText":"In order to add one or more interventions, click the green +.",
            "groupDisplayText":"2. Interventions",
            "id":2,
            "group_id":"Intervention",
            "isDummy":true   
            }    
]           
}
*/

$totalResult = array();
$totalResult['success']=true;
$totalResult['total']=5;
$totalResult['prismas']=array();


$row1 = array(
	'displayText'		=> 		'In order to add one or more patients or diseases, click the green +. ',
	'groupDisplayText'	=>		'1. Patients / Disease',
        'id'                    =>              1,
        'group_id'              =>              'Disease',
        'isDummy'               =>              true
);

$row2 = array(
	'displayText'		=> 		'In order to add one or more interventions, click the green +.',
	'groupDisplayText'	=>		'2. Interventions',
        'id'                    =>              2,
        'group_id'              =>              'Intervention',
        'isDummy'               =>              true
);
$row3 = array(
	'displayText'		=> 		'In order to add one or more comparisons, click the green +.',
	'groupDisplayText'	=>		'3. Comparisons',
        'id'                    =>              3,
        'group_id'              =>              'Comparison',
        'isDummy'               =>              true
);
$row4 = array(
	'displayText'		=> 		'In order to add one or more outcomes, click the green +.',
	'groupDisplayText'	=>		'4. Outcome',
        'id'                    =>              4,
        'group_id'              =>              'Outcome',
        'isDummy'               =>              true
);
$row5 = array(
	'displayText'		=> 		'In order to add one or more study types, click the green +.',
	'groupDisplayText'	=>		'5. Study Type',
        'id'                    =>              5,
        'group_id'              =>              'Study_Type',
        'isDummy'               =>              true
);


array_push($totalResult['prismas'],$row1);
array_push($totalResult['prismas'],$row2);
array_push($totalResult['prismas'],$row3);
array_push($totalResult['prismas'],$row4);
array_push($totalResult['prismas'],$row5);

//print the json representation of this array:
print json_encode($totalResult);

die();


?> 
    