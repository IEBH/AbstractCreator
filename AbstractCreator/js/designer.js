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
	/**
	* Instances of ZeroClipboard
	* @var object
	*/
	clipboards: {},

	options: {
		url: 'http://local/',
		lastid: 0
	},

	/**
	* Load a schema file
	* @param string schema A file located in schemas/*.html
	*/
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
						var sectionbox = $('<div class="section-box" id="sectionbox-' + $(this).data('ref') + '" data-ref="' + $(this).data('ref') + '" data-icon="' + ($(this).data('icon') || 'icon-circle') + '"></div>')
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
				$('#editor tr').each(function() {
					$(this).find('.editline:first').addClass('active');
				});
				$.refreshrefs();
			},
			error: function(a, e) {
				$.error('Cannot load scene ' + scene + ' - ' + e);
			}
		});
	},

	/**
	* Refresh all a.type-ref links with a list composed of the ref items
	*/
	refreshrefs: function() {
		var reftext = [];
		$('.section-box').each(function() {
			var text = [];
			$(this).find('.nav li').not('.ignore').each(function() {
				text.push($(this).text());
			});

			if (text.length > 1) {
				var lasttext = text.pop();
				reftext[$(this).data('ref')] = text.join(', ') + ' and ' + lasttext;
			} else
				reftext[$(this).data('ref')] = text.join(', ');
		});
		$('#editor a.type-ref').each(function() {
			if (reftext[$(this).data('ref')]) { // Has content
				$(this).text(reftext[$(this).data('ref')]);
			} else { // Yet to fill in content
				$(this).text($(this).data('ref').toUpperCase());
			}
		});
	},

	/**
	* Initalize everything
	*/
	init: function() {
		// Setup top menus {{{
		$('#navbar #fat-menu').show();
		// }}}
		// Event handlers {{{
		$('#editor').popover({
			placement: 'bottom',
			selector: '.section-option > a',
			title: 'Edit text <i class="pull-right icon-remove-sign"></i>',
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
					out = '<div class="pull-center"><a href="#" data-toggle="modal" class="btn" data-action="edit-section"><i class="' + $('#sectionbox-' + $(this).data('ref')).data('icon') + '"></i> ' + $('#sectionbox-' + $(this).data('ref') + ' .nav-header').text() + '</a></div>';
				} else if ($(this).hasClass('type-text')) { // Loose text input
					out = '<textarea>' + $(this).text() + '</textarea>';
				} else {
					console.warn('Dont know how to deal with this link type');
				}
				out += '</div>';
				setTimeout(function() { // When we yield...
					var popover = $.selectlink.next('.popover');
					popover.find('textarea').select(); // Trigger a select on the text area
					popover // Allocate the type class to the popover so we can theme it differently
						.toggleClass('type-text', $.selectlink.hasClass('type-text'))
						.toggleClass('type-ref', $.selectlink.hasClass('type-ref'))
						.toggleClass('type-list', $.selectlink.hasClass('type-list'));
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
			})
			.on('click', '.popover-content [data-action=edit-section]', function() {
				$('#sectionbox-' + $.selectlink.data('ref') + ' .nav-header a').trigger('click');
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
		// }}}
		// Modal: #edit-section {{{
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
			$.refreshrefs();
		});
		// }}}
		// Modal: Clipboard {{{
		$.clipboards['modal-clipboard'] = new ZeroClipboard($('#clipboard [data-action=copy-text]'), {moviePath: "/lib/zeroclipboard/ZeroClipboard.swf"});
		$('#clipboard').on('shown', function() {
			var text = [];
			$('#editor .editline.active .section-option').each(function() {
				var line = $(this).clone();
				line.find('div, ul').remove();
				text.push($.trim(line.text().replace(/\s+/g, ' ')));
			});
			$(this).find('.modal-body textarea').val(text.join("\n"));
		});
		// }}}
		// Modal: Save {{{
		$('#save').on('shown', function() {
			$('#save .modal-body').html('<div class="pull-center"><div class="alert alert-info">It would be great if we can save your email in case we need to contact you</div><div><input type="text" id="save-email"/><span class="help-block">Providing your email address is optional</span></div><div class="pad-top"><a class="btn btn-large btn-success" data-action="save"><i class="icon-save"></i> Save</a></div></div>');
			$('#save #save-email').focus();
		})
		.on('click', '[data-action=save]', function() {
			$('#save .modal-body').html('<div class="pull-center font-huge"><i class="icon-spinner icon-spin"></i> Saving...</div>');
			setTimeout(function() {
				$('#save .modal-body').html('<div class="pull-center"><div class="alert alert-info">Open the unique URL below in any browser to continue creating your abstract</div><div><input type="text" id="save-url" value="http://crebp.net.au/ac/h82ldy2"/></div><div><a href="#" data-action="copy-text" data-clipboard-target="save-url" class="btn btn-success"><i class="icon-copy"></i> Copy to clipboard</a></div></div>');
				$.clipboards['modal-save'] = new ZeroClipboard($('#save [data-action=copy-text]'), {moviePath: "/lib/zeroclipboard/ZeroClipboard.swf"});
			}, 3000);
		});
		// }}}
		// FIXME: Temporary forced load of hard coded schema name
		$.go('interventions');
	}
});

$.init();
});
