'use strict';

angular.module('blog.controllers', ['ngRoute'])
  .controller('NewPostCtrl', function($location, $scope, api){
    $scope.formData = {};

    $scope.saveForm = function(){
      api.createPost($scope.formData)
        .success(function(data){
          $location.path('/posts/' + data.id);
        });
    }
  })
  .controller('PostListCtrl', function($scope, postListResponse){
    $scope.postList = postListResponse.data;
  })
  .controller('PostDetailsCtrl', function($http, $scope, api, postDetailsResponse){
    var getFormData = function(post) {
      return {
        title: post.title,
        body: post.body
      };
    };

    // is the post being edited?
    $scope.inEditMode = false;

    // is a save in progress?
    $scope.inSaveMode = false;

    $scope.post = postDetailsResponse.data;

    $scope.formData = getFormData($scope.post);

    $scope.saveForm = function(){
      $scope.inSaveMode = true;
      api.updatePost($scope.post.id, $scope.formData)
        .success(function(data){
          $scope.post = data;
          $scope.formData = getFormData(data);
          $scope.inEditMode = false;
        })
        .error(function(){
          alert('We hit an issue trying to save your changes.');
        })
        .finally(function(){
          $scope.inSaveMode = false;
        });
    }
  });
