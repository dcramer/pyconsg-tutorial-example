'use strict';

var blogApp = angular.module('blog', [
  'ngRoute',
  'ngSanitize',
  'btford.markdown',
  'blog.controllers'
]).config(function($provide, $routeProvider) {
  // wire up routes
  $routeProvider
    .when('/', {
      templateUrl: 'post-list.html',
      controller: 'PostListCtrl',
      resolve: {
        postListResponse: function($http) {
          return $http.get('/api/0/posts/');
        }
      }
    })
    .when('/posts/:post_id', {
      templateUrl: 'post-details.html',
      controller: 'PostDetailsCtrl',
      resolve: {
        postDetailsResponse: function($http, $route) {
          return $http.get('/api/0/posts/' + $route.current.params.post_id + '/');
        }
      }
    })
    .when('/new/post', {
      templateUrl: 'new-post.html',
      controller: 'NewPostCtrl'
    });

  // Create generic loading indicator
  // http://stackoverflow.com/questions/17494732/how-to-make-a-loading-indicator-for-every-asynchronous-action-using-q-in-an-a
  $provide.decorator('$q', function($delegate, $rootScope) {
    var pendingPromisses = 0;
    $rootScope.$watch(
      function() { return pendingPromisses > 0; },
      function(loading) { $rootScope.loading = loading; }
    );
    var $q = $delegate;
    var origDefer = $q.defer;
    $q.defer = function() {
      var defer = origDefer();
      pendingPromisses++;
      defer.promise.finally(function() {
        pendingPromisses--;
      });
      return defer;
    };
    return $q;
  });
});
