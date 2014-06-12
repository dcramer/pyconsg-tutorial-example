'use strict';

angular.module('blog.controllers', ['ngRoute'])
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
  .controller('PostDetailsCtrl', function($http, $scope, postDetailsResponse){
    $scope.formData = {};
    $scope.inEditMode = false;
    $scope.$watch('post', function(post){
      $scope.formData = {
        title: post.title,
        body: post.body
      }
    })

    $scope.post = postDetailsResponse.data;

    $scope.saveForm = function(){
      $http({
        method: 'POST',
        url: '/api/0/posts/' + $scope.post.id + '/',
        data: $scope.formData
      }).success(function(data){
        $scope.post = data;
        $scope.inEditMode = false;
      });
    }
  });
