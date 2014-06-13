'use strict';

angular.module('blog.directives', [
  'blog.directives.timeSince'
]);

angular.module('blog.directives.timeSince', [])
  .directive('timeSince', function($timeout) {
    return function(scope, element, attrs) {
      var $element = angular.element(element),
          timeout_id;

      function tick(){
        var value = scope.$eval(attrs.timeSince),
            time = moment.utc(value),
            age = moment().diff(time, 'minute'),
            seconds_until_update;

        element.text(time.fromNow());

        if (age < 1) {
          seconds_until_update = 1;
        } else if (age < 60) {
          seconds_until_update = 30;
        } else if (age < 180) {
          seconds_until_update = 300;
        } else {
          seconds_until_update = 3600;
        }
        timeout_id = $timeout(tick, seconds_until_update * 1000);
      }

      scope.$watch(attrs.timeSince, function(value){
        if (!value) {
          return '';
        }

        element.text(moment.utc(value).fromNow());
      });

      element.bind('$destroy', function() {
        $timeout.cancel(timeout_id);
      });

      tick();
    };
  });
