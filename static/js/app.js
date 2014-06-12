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
        postDetailsResponse: function($http, $route) {
          return $http.get('/api/0/posts/' + $route.current.params.post_id + '/');
        }
      }
    })
    .when('/posts/:post_id/edit', {
      templateUrl: 'edit-post.html',
      controller: 'EditPostCtrl',
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
}]);
