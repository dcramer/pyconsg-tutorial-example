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
    var getFormData = function(post) {
      return {
        title: post.title,
        body: post.body
      };
    };

    $scope.inEditMode = false;
    $scope.inSaveMode = false;
    $scope.post = postDetailsResponse.data;
    $scope.formData = getFormData($scope.post);

    $scope.saveForm = function(){
      $scope.inSaveMode = true;
      $http({
        method: 'POST',
        url: '/api/0/posts/' + $scope.post.id + '/',
        data: $scope.formData
      }).success(function(data){
        $scope.post = data;
        $scope.formData = getFormData(data);
        $scope.inEditMode = false;
      }).error(function(){
        alert('We hit an issue trying to save your changes.');
      }).finally(function(){
        $scope.inSaveMode = false;
      });
    }
  });
