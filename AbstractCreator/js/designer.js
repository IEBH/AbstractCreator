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
				var refno = 0;
				editor.html('<table class="table table-stripped table-bordered"><tr><th>Section</th><th width="80%">Text</th></tr></table>');
				$(html)
					.children('.ref').each(function() { // Process refs
						var sectionbox = $('<div class="section-box"></div>')
							.append('<div class="nav-header" data-toggle="collapse" data-target="sidebar-' + ++refno +'"><i class="' + ($(this).data('icon') || 'icon-circle') + '"></i>' + $(this).text() + '<a class="btn btn-small" data-action="add-section"><i class="icon-plus"></i></span></div>')
							.appendTo('#sidebar');
						var sidebar = $('<ul id="sidebar-' + refno + '" class="nav nav-list collapse in"><li class="pull-center ignore"><a href="#" data-action="add-section" class="muted font-tiny"><i class="icon-plus"></i> Add ' + $(this).text() + '</a></li></ul>')
							.appendTo(sectionbox);
					})
					.end()
					.children('.section').each(function() { // Process sections
						var row = $('<tr><td>' + $(this).data('title') + '</td><td></td></tr>')
							.appendTo('#editor table');
						var rowContent = row.find('td:eq(1)');
						$(this).find('.section-option').each(function() {
							$(this).find('a').each(function() {
								// Give each a unique ID
								$(this).attr('id', 'fillin-' + $.options.lastid++);

								if ($(this).children('ul').length) { // Has a child UL - type=list
									$(this).children('ul').each(function() {
										$(this).find('li').each(function() {
											var options = $(this).closest('a').data('options') || [];
											options.push($(this).text());
											$(this).closest('a').data('options', options);
										});
										$(this).closest('a').text($(this).children('li:first').text()); // Clear the UL item and set to first child LI
									});
									$(this).addClass('type-list');
								} else if ($(this).data('ref')) { // Is a reference
									$(this).addClass('type-ref');
								} else { // Unknown type - type=text
									$(this).addClass('type-text');
								}
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
				$.selectlink = $(this);
				$('#editor .popover').hide();
				var out = '<div class="form form-horizontal" data-parent-a="' + $(this).attr('id') + '">';
				if ($(this).hasClass('type-list')) { // Has a pre-defined options list
					$.each($(this).data('options'), function(i, o) {
						out += '<label class="radio"><input type="radio" name="popover-radio"' + (i==0?' checked="checked"':'') + '/>' + o + '</label>';
					});
					out += '<label class="radio"><input type="radio" name="popover-radio"/><textarea>' + $(this).text() + '</textarea></label>';
				} else if ($(this).hasClass('type-ref')) { // Trying to edit a reference
					out = '<div class="pull-center"><a href="#edit-section" data-toggle="modal" class="btn">Edit FIXME</a></div>';
				} else if ($(this).hasClass('type-text')) { // Loose text input
					out = '<textarea>' + $(this).text() + '</textarea>';
				} else {
					console.warn('Dont know how to deal with this link type');
				}
				out += '</div>';
				setTimeout(function() {
					// Trigger a select on the text area when we are yielding
					$.selectlink.next('.popover').find('textarea').select();
				}, 0);
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
			$.sectionbox = $(this).closest('.section-box');
			$('#edit-section .modal-header h3').text('Edit ' + $.sectionbox.children('.nav-header').text());
			$('#edit-section .modal-body').empty();
			var list = $('<table class="table table-striped table-bordered"></table>').appendTo('#edit-section .modal-body');
			var count = 1;
			$.sectionbox.find('.nav-list li').each(function() {
				if ($(this).hasClass('ignore')) return;
				list.append('<tr><th width="25px">' + count++ + '</th><td><input type="text" value="' + $(this).text() + '"/></td></tr>');
			});
			list.append('<tr><th width="25px">' + count++ + '</th><td><input type="text" value=""/></td></tr>');
			$('#edit-section').modal('show');
		});
		$('#edit-section').on('shown', function() {
			// Select the LAST input box available when showing the edit pane
			$(this).find('input:last').select();
		});
		$('#edit-section .modal-body').on('keyup', 'input', function() {
			// Keep adding new rows whenever the last row is not blank
			var list = $(this).closest('table');
			if (list.find('tr:last input').val())
				list.append('<tr><th width="25px">' + (list.find('tr').length+1) + '</th><td><input type="text" value=""/></td></tr>');
		});
		$('#edit-section').on('click', '[data-action=save-section]', function() {
			var list = $.sectionbox.find('.nav-list');
			list.empty();
			$('#edit-section .modal-body table tr input').each(function() {
				if ($(this).val())
					list.append('<li><a href="#">' + $(this).val() + '</a></li>');
			});
			list.append('<li class="pull-center ignore"><a href="#" data-action="add-section" class="muted font-tiny"><i class="icon-plus"></i> Add ' + $.sectionbox.find('.nav-header').text() + '</a></li>');
		});
		// }}}
		// FIXME: Temporary forced load of hard coded schema name
		$.go('interventions');
	}
});

$.init();
});
