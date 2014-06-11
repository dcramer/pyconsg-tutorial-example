var blogApp = angular.module('blog', [
  'ngRoute',
  'blog.controllers'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'post-list.html',
      controller: 'PostListCtrl'
    });
}]);
