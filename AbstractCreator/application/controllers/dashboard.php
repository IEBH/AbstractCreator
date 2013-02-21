<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Dashboard extends CI_Controller {
	function index() {
		$this->site->header(SITE_TITLE);
		$this->load->view('dashboard/index');
		$this->site->footer();
	}
}
