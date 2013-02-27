<!DOCTYPE html>
<html lang="en">
<? include('application/views/site/head.php') ?>

<body>
	<div class="navbar" id="navbar">
		<div class="navbar-inner">
			<div class="container-fluid">
				<ul class="nav pull-right">
					<li id="fat-menu" class="dropdown">
						<a href="#" id="drop3" role="button" class="dropdown-toggle" data-toggle="dropdown">
							Export <i class="icon-caret-down"></i>
						</a>
						<ul class="dropdown-menu">
							<li><a tabindex="-1" href="#save" data-toggle="modal">Save + Share URL</a></li>
							<li><a tabindex="-1" href="#clipboard" data-toggle="modal">Copy to clipboard</a></li>
							<li class="divider"></li>
							<li><a tabindex="-1" href="http://www.crebp.net.au/" target="_NEW">CREBP Homepage</a></li>
						</ul>
					</li>
				</ul>
				<a class="brand" href="/"><span class="first">Abstract</span> <span class="second">Creator</span></a>
			</div>
		</div>
	</div>
	<? if (!isset($span) || $span) { ?>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span12">
			<? include('application/views/site/messages.php') ?>
	<? } ?>
