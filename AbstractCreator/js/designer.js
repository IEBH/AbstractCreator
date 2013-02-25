$(function() {
	// Provide box minimizing ability {{{
	$('.box a[data-action=minimize]') // Make data-action=minimize minimize boxes
		.click(function(e) {
			e.preventDefault();
			var $target = $(this).parent().parent().next('.box-content');
			if ($target.is(':visible')) {
				$('i', $(this)).removeClass('icon-chevron-up').addClass('icon-chevron-down');
			} else
				$('i', $(this)).removeClass('icon-chevron-down').addClass('icon-chevron-up');
			$target.slideToggle();
		})
		.parents('.box-title').find('h4') // If the box has a minimize button also apply this behaviour if the user just clicks the title bar
			.css('cursor', 'pointer')
			.click(function() {
				$(this).next('.box-control').find('a[data-action=minimize]').trigger('click');
			});
	$('.box.closed').each(function() {
		$(this).find('.box-content').hide();
		$(this).find('.box-control a[data-action=minimize] i')
			.removeClass('icon-chevron-up')
			.addClass('icon-chevron-down');
	});
	// }}}

$.extend({
	options: {
		url: 'http://local/',
		lastid: 0
	},

	go: function(schema) {
		$.ajax({
			url: $.options.url + 'schemas/' + schema + '.html',
			dataType: 'html',
			success: function(html) {
				// Clean up {{{
				$('#sub-sidebar ul').empty();
				$.options.lastid = 0;
				// }}}
				var editor = $('#editor');
				editor.html('<table class="table table-stripped table-bordered"><tr><th>Section</th><th width="80%">Text</th></tr></table>');
				var sidebarid = 0;
				$(html)
					.children('.section').each(function() {
						var sectionbox = $('<div class="section-box"></div>')
							.append('<div class="nav-header" data-toggle="collapse" data-target="sidebar-' + ++sidebarid +'"><i class="' + ($(this).data('icon') || 'icon-circle') + '"></i>' + $(this).data('title') + '<a class="btn btn-small" data-action="add-section"><i class="icon-plus"></i></span></div>')
							.appendTo('#sidebar');
						var sidebar = $('<ul id="sidebar-' + sidebarid + '" class="nav nav-list collapse in"><li class="pull-center"><a href="#" data-action="add-section" class="muted font-tiny"><i class="icon-plus"></i> Add ' + $(this).data('title') + '</a></li></ul>')
							.appendTo(sectionbox);
						var row = $('<tr><td>' + $(this).data('title') + '</td><td></td></tr>')
							.appendTo('#editor table');
						var rowContent = row.find('td:eq(1)');
						$(this).find('.section-option').each(function() {
							$(this).find('a').each(function() {
								// Has a child UL
								$(this).children('ul').each(function() {
									$(this).find('li').each(function() {
										var options = $(this).closest('a').data('options') || [];
										options.push($(this).text());
										$(this).closest('a').data('options', options);
									});
									$(this).closest('a').text($(this).children('li:first').text()); // Clear the UL item and set to first child LI
								});

								// Give each a unique ID
								$(this).attr('id', 'fillin-' + $.options.lastid++);
							});

							$('<div class="editline"></div>')
								.appendTo(rowContent)
								.append(this);
						});
					});
			},
			error: function(a, e) {
				$.error('Cannot load scene ' + scene + ' - ' + e);
			}
		});
	},
	init: function() {
		// Event handlers {{{
		$('#editor').popover({
			placement: 'bottom',
			selector: '.section-option > a',
			title: 'Hello World <i class="pull-right icon-remove-sign"></i>',
			html: true,
			content: function() {
				$('#editor .popover').hide();
				var out = '<div class="form form-horizontal" data-parent-a="' + $(this).attr('id') + '">';
				var options;
				if (options = $(this).data('options')) { // Has a pre-defined options list
					$.each(options, function(i, o) {
						out += '<label class="radio"><input type="radio" name="popover-radio"' + (i==0?' checked="checked"':'') + '/>' + o + '</label>';
					});
					out += '<label class="radio"><input type="radio" name="popover-radio"/><textarea></textarea></label>';
				} else { // No idea - loose text input
					out = '<textarea></textarea>';
				}
				out += '</div>';
				return out;
			}
		});
		$('#editor')
			.on('click', '.popover-title', function() {
				$(this).closest('.popover').hide();
			})
			.on('click', '.popover-content input[type=radio]', function() {
				console.log('a', a);
				var a = $('#' + $(this).closest('div.form').data('parent-a'));
				a.text($(this).closest('label').text());
			});
		$('#sidebar').on('click', '[data-action=add-section]', function() {
			$('#edit-section .modal-header h3').text('Edit ' + $(this).closest('.section-box').children('.nav-header').text());
			$('#edit-section').modal('show');
		});
		// }}}
		// FIXME: Temporary forced load of hard coded schema name
		$.go('interventions');
	}
});

$.init();
});
