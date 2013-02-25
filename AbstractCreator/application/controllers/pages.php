<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Pages extends CI_Controller {
	function Index() {
		$this->Creator();
	}

	function Creator() {
		$this->site->header(SITE_TITLE);
		$this->load->view('pages/creator');
		$this->site->footer();
	}
}
