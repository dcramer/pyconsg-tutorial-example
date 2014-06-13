'use strict';

var blogApp = angular.module('blog', [
  'btford.markdown',
  'ngRoute',
  'ngSanitize',

  'blog.controllers',
  'blog.directives',
  'blog.services'
]).config(function($routeProvider) {
  // wire up routes
  $routeProvider
    .when('/', {
      templateUrl: 'post-list.html',
      controller: 'PostListCtrl',
      resolve: {
        postListResponse: function(api) {
          return api.listPosts();
        }
      }
    })
    .when('/posts/:post_id', {
      templateUrl: 'post-details.html',
      controller: 'PostDetailsCtrl',
      resolve: {
        postDetailsResponse: function($route, api) {
          return api.getPost($route.current.params.post_id);
        }
      }
    })
    .when('/new/post', {
      templateUrl: 'new-post.html',
      controller: 'NewPostCtrl'
    })
    .otherwise("/");
});
