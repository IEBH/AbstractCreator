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
	// Setup local links (from box-titles) {{{
	var headers = $('div.box[data-ref] h4, h4[data-ref]');
	if (headers.length) {
		headers.each(function() {
			var direct = $(this).data('ref-direct'); // If data-ref-direct is set go straight there rather than navigating to the title
			var link = direct;
			if (!direct) {
				var anchor = $(this).closest('div.box').data('ref');
				$(this).closest('div.box').before('<a name="' + anchor + '"></a>');
				link = '#' + anchor;
			}

			var item = $('<li><a href="' + link + '">' + $(this).html() + '</a></li>')
				.appendTo('#sub-sidebar ul');

			if (!direct)
				item.click(function() {
					var box = $('div.box[data-ref="' + anchor + '"]');
					if (box.hasClass('closed'))
						box.find('.box-control a').trigger('click');
				})
		});
	} else 
		$('#sub-sidebar').remove();
	// }}}
});
