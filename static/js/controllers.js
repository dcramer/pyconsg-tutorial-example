'use strict';

angular.module('blog.controllers', ['ngRoute'])
  .controller('EditPostCtrl', function($http, $location, $scope, postDetailsResponse){
    $scope.post = postDetailsResponse.data;
    $scope.formData = {
      title: $scope.post.title,
      body: $scope.post.body
    };
    $scope.saveForm = function(){
      $http({
        method: 'POST',
        url: '/api/0/posts/' + $scope.post.id + '/',
        data: $scope.formData
      }).success(function(data){
        $location.path('/posts/' + data.id);
      })
    }
  })
  .controller('NewPostCtrl', function($http, $location, $scope){
    $scope.formData = {};
    $scope.saveForm = function(){
      $http({
        method: 'POST',
        url: '/api/0/posts/',
        data: $scope.formData
      }).success(function(data){
        $location.path('/posts/' + data.id);
      })
    }
  })
  .controller('PostListCtrl', function($scope, postListResponse){
    $scope.postList = postListResponse.data;
  })
  .controller('PostDetailsCtrl', function($scope, postDetailsResponse){
    $scope.post = postDetailsResponse.data;
  });
