<!DOCTYPE html>
<html lang="en">
<? include('application/views/site/head.php') ?>

<body>
	<div class="navbar">
		<div class="navbar-inner">
			<div class="container-fluid">
				<ul class="nav pull-right">
					<li id="fat-menu" class="dropdown">
						<a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown">
							<i class="icon-user"></i> Jack Smith
							<i class="icon-caret-down"></i>
						</a>

						<ul class="dropdown-menu">
							<li><a tabindex="-1" href="#">Settings</a></li>
							<li class="divider"></li>
							<li><a tabindex="-1" href="sign-in.html">Logout</a></li>
						</ul>
					</li>
				</ul>
				<a class="brand" href="/"><span class="first">Abstract</span> <span class="second">Creator</span></a>
			</div>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span3">
				<div class="sidebar-nav">
				  <div class="nav-header" data-toggle="collapse" data-target="#dashboard-menu"><i class="icon-dashboard"></i>Dashboard</div>
					<ul id="dashboard-menu" class="nav nav-list collapse in">
						<li><a href="index.html">Home</a></li>
						<li ><a href="users.html">Sample List</a></li>
						<li ><a href="user.html">Sample Item</a></li>
						<li ><a href="gallery.html">Gallery</a></li>
						<li ><a href="calendar.html">Calendar</a></li>
						<li ><a href="faq.html">Faq</a></li>
						<li ><a href="help.html">Help</a></li>
						
					</ul>
				<div class="nav-header" data-toggle="collapse" data-target="#accounts-menu"><i class="icon-briefcase"></i>Account<span class="label label-info">+10</span></div>
				<ul id="accounts-menu" class="nav nav-list collapse in">
				  <li ><a href="sign-in.html">Sign In</a></li>
				  <li ><a href="sign-up.html">Sign Up</a></li>
				  <li ><a href="reset-password.html">Reset Password</a></li>
				</ul>

				<div class="nav-header" data-toggle="collapse" data-target="#settings-menu"><i class="icon-exclamation-sign"></i>Error Pages</div>
				<ul id="settings-menu" class="nav nav-list collapse in">
				  <li ><a href="403.html">403 page</a></li>
				  <li ><a href="404.html">404 page</a></li>
				  <li ><a href="500.html">500 page</a></li>
				  <li ><a href="503.html">503 page</a></li>
				</ul>

				<div class="nav-header" data-toggle="collapse" data-target="#legal-menu"><i class="icon-legal"></i>Legal</div>
				<ul id="legal-menu" class="nav nav-list collapse in">
				  <li ><a href="privacy-policy.html">Privacy Policy</a></li>
				  <li ><a href="terms-and-conditions.html">Terms and Conditions</a></li>
				</ul>
			</div>
		</div>
		<div class="span9">
			<? include('application/views/site/messages.php') ?>
