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
		<? if (!isset($span) || $span) { ?>
		<div class="row-fluid">
			<div class="span12">
			<? include('application/views/site/messages.php') ?>
		<? } ?>
