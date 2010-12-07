// $Id: ajax_tabs.js,v 1.1 2009/08/04 14:00:02 doublethink Exp $

Drupal.AjaxTabs = Drupal.AjaxTabs || {};
Drupal.behaviors.AjaxTabs = function (context) {
	$('#tabs-wrapper a').click(function() {
		var target = $('#AjaxTabs-wrapper');
		if (!$(this).hasClass('active')) {
			$.ajax({
				type: 'POST',
				data: 'AjaxTabs=1',
				dataType: 'json',
				url: $(this).attr('href'),
				success: function(response){
					if (response.__callbacks) {
						$.each(response.__callbacks, function(i, callback) {
							eval(callback)(target, response);
						});
					}
					document.title = response.head_title;
				}
			});
			$('#tabs-wrapper li').removeClass('active');
			$('#tabs-wrapper a').removeClass('active');
			$(this).addClass('active');
			$(this).parents('#tabs-wrapper li').addClass('active');
		}
		return false;
	});
}
	
Drupal.AjaxTabs.contentCallback = function (target, response) {
	target = $(target).hide().html(response.content).fadeIn();
	Drupal.attachBehaviors(target);
}
