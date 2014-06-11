'use strict';

var blogApp = angular.module('blog', [
  'ngRoute',
  'blog.controllers'
]).config(['$routeProvider', function($routeProvider) {
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
        postDetailsResponse: function($http, $routeParams) {
          return $http.get('/api/0/posts/' + $routeParams.post_id + '/');
        }
      }
    });
}]);
