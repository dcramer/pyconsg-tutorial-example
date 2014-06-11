angular.module('blog.controllers', [])
  .controller('PostListCtrl', ['$http', '$scope', function($http, $scope){
    $http.get('/api/0/posts/')
      .success(function(data){
        $scope.postList = data;
      });
  }]);
