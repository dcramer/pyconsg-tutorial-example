'use strict';

angular.module('blog.services', [
  'blog.services.loadingIndicator',
  'blog.services.api'
]);

angular.module('blog.services.loadingIndicator', [])
  .config(function($httpProvider){
    var interceptor = function($rootScope) {
      var reqsTotal = 0;
      var reqsCompleted = 0;

      return {
        request: function(config) {
          // Check to make sure this request hasn't already been cached and that
          // the requester didn't explicitly ask us to ignore this request:
          $rootScope.loading = true;
          reqsTotal++;
          return config;
        },

        response: function(response) {
          reqsCompleted++;
          if (reqsCompleted >= reqsTotal) {
            $rootScope.loading = false;
          }
          return response;
        },

        responseError: function(rejection) {
          reqsCompleted++;
          if (reqsCompleted >= reqsTotal) {
            $rootScope.loading = false;
          }
          return $q.reject(rejection);
        }
      };
    };

    $httpProvider.interceptors.push(interceptor);

    // TODO:
    // bind a simple route error handler
    // $rootScope.$on("$routeChangeStart", function(){
    //   $rootScope.loadingError = false;
    // });

    // $rootScope.$on("$routeChangeError", function(){
    //   $rootScope.loadingError = true;
    // });
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
