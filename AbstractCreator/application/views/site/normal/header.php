<!DOCTYPE html>
<html lang="en">
<? include('application/views/site/head.php') ?>

<body>
<div class="header container-fluid">
	<div class="row-fluid">
		<div class="span10 offset1">
			<div class="logo">
				<a href="/"><h1><?=SITE_TITLE?></h1></a>
			</div>
			<div class="search">
				<input id="search" class="input-xlarge focused" type="text" value="search" placeholder="Search">
			</div>
		</div>
	</div>
</div>
<div class="user-box container-fluid">
	<div class="row-fluid">
		<div class="span10 offset1">
			<div class="user-content">
				<div class="row-fluid">
					<div class="top-user-info span9">
						<ul class="user-config">
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">
									<div class="welcome">Welcome, <?=isset($_SESSION['user']['firstname']) ? ucfirst($_SESSION['user']['firstname']) : 'Admin'?><b class="caret"></b></div>
								</a>
								<ul class="dropdown-menu">
									<li><a href="/logout"><i class="icon-off"></i> Logout</a></li>
								</ul>
							</li>
						</ul>
						<!-- <span class="badge badge-important">1 new message</span> <span class="badge badge-info">8 messages</span> <span class=" badge badge-success">15 followers</span> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<section class="container-fluid">
	<div class="row-fluid">
		<div class="span10 offset1">
			<div class="row-fluid">
			<? include('application/views/site/sidebar.php') ?>

			<div class="span9">
				<? include('application/views/site/messages.php') ?>
