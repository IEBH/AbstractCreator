<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
$active_group = 'default';
$active_record = TRUE;

if (preg_match('/\.mfdc\.biz$/', $_SERVER['SERVER_NAME'])) {
	$db['default']['hostname'] = 'localhost';
	$db['default']['database'] = '';
	$db['default']['username'] = '';
	$db['default']['password'] = '';
} else {
	$db['default']['hostname'] = 'localhost';
	$db['default']['database'] = 'abstractcreator';
	$db['default']['username'] = 'mc';
	$db['default']['password'] = '';
}
$db['default']['dbdriver'] = 'mysql';
$db['default']['dbprefix'] = '';
$db['default']['pconnect'] = TRUE;
$db['default']['db_debug'] = TRUE;
$db['default']['cache_on'] = FALSE;
$db['default']['cachedir'] = '';
$db['default']['char_set'] = 'utf8';
$db['default']['dbcollat'] = 'utf8_general_ci';
$db['default']['swap_pre'] = '';
$db['default']['autoinit'] = TRUE;
$db['default']['stricton'] = FALSE;
