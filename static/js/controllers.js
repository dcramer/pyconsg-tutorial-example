'use strict';

angular.module('blog.controllers', ['ngRoute'])
  .controller('PostListCtrl', function($http, $scope){
    $http.get('/api/0/posts/')
      .success(function(data){
        $scope.postList = data;
      });
  })
  .controller('PostDetailsCtrl', function($http, $routeParams, $scope){
    $http.get('/api/0/posts/' + $routeParams.post_id + '/')
      .success(function(data){
        $scope.post = data;
      });
  });
