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
  .controller('PostDetailsCtrl', function($scope, postDetailsResponse){
    $scope.post = postDetailsResponse.data;
  });
