'use strict';

angular.module('blog.services', [
  'blog.services.loadingIndicator',
  'blog.services.api'
]);

angular.module('blog.services.loadingIndicator', [])
  .config(function($provide){
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

angular.module('blog.services.api', [])
  .factory('api', function($http){
    var api = {},
        urlBase = '/api/0';

    api.listPosts = function(){
      return $http.get(urlBase + '/posts/');
    };

    api.createPost = function(data){
      return $http.post(urlBase + '/posts/', data);
    };

    api.getPost = function(id){
      return $http.get(urlBase + '/posts/' + id + '/');
    };

    api.updatePost = function(id, data){
      return $http.post(urlBase + '/posts/' + id + '/', data);
    };

    return api;
  });
