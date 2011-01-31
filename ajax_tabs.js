// $Id$

/**
 * @file
 * Contains Ajax Tabs JS behaviors.
 */

/**
 * Defines AjaxTabs mother object.
 */
Drupal.AjaxTabs = Drupal.AjaxTabs || {};

/**
 * AjaxTabs helper callback.
 */
Drupal.AjaxTabs.contentCallback = function(target, response) {
  target = $(target).hide().html(response.content).fadeIn();
  Drupal.attachBehaviors(target);
}

/**
 * AjaxTabs main JS behavior.
 */
Drupal.behaviors.AjaxTabs = function(context) {
  $(Drupal.settings.ajaxTabs.selector).find('a').click(function() {
    var target = $('#AjaxTabs-wrapper');

    if (!$(this).hasClass('active')) {
      $.ajax({
        type: 'POST',
        data: 'AjaxTabs=1',
        dataType: 'json',
        url: $(this).attr('href'),
        success: function(response) {
          if (response.__callbacks) {
            $.each(response.__callbacks, function(i, callback) {
              eval(callback)(target, response);
            });
          }
          document.title = response.head_title;
        }
      });

      $(Drupal.settings.ajaxTabs.selector).find('li').removeClass('active');
      $(Drupal.settings.ajaxTabs.selector).find('a').removeClass('active');
      $(this).addClass('active');
      $(this).parents(Drupal.settings.ajaxTabs.selector + ' li').addClass('active');
    }

    return false;
  });
}

