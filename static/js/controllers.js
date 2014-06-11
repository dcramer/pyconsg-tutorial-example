'use strict';

angular.module('blog.controllers', ['ngRoute'])
  .controller('PostListCtrl', function($scope, postListResponse){
    $scope.postList = postListResponse.data;
  })
  .controller('PostDetailsCtrl', function($scope, postDetailsResponse){
    $scope.post = postDetailsResponse.data;
  });
