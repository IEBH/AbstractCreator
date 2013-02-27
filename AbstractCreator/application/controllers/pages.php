<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pages extends CI_Controller {
	function Index() {
		$this->site->header(SITE_TITLE, array('span' => FALSE));
		$this->load->view('pages/index');
		$this->site->footer();
	}

	function Designer() {
		$this->site->header(SITE_TITLE, array('span' => false));
		$this->load->view('pages/designer');
		$this->site->footer();
	}
}
