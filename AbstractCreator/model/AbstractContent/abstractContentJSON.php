<?php 
header('Content-Type: application/json');
/*
{
    "success": true,
    "total": 12,
    "users": [
        { "name": "Lisa", "email": "lisa@simpsons.com", "phone": "555-111-1224" },
        { "name": "Bart", "email": "bart@simpsons.com", "phone": "555-222-1234" },
        { "name": "Homer", "email": "home@simpsons.com", "phone": "555-222-1244" },
        { "name": "Marge", "email": "marge@simpsons.com", "phone": "555-222-1254" }
    ]
}
*/
$totalResult                =   array();
$totalResult['success']     =   true;
$totalResult['total']       =   0;
$totalResult['content']     =   array();


/*
 * 
 * if the relations are saved and retrieved from a database, then it could look like this:
 * 
$row1 = array(
	'id'                    => 		"ext-gen11",
	'prismaReference'	=>		"ext-gen10",
        'parentNodeId'          =>              "objectiveOutcome"
)


array_push($totalResult['prismas'],$row1);
;*/
echo json_encode($totalResult);

die();


?> 
    