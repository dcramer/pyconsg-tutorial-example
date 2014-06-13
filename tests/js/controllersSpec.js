'use strict';

describe('controllers', function(){
  var samplePost, samplePost2;

  beforeEach(module('blog.controllers'));
  beforeEach(module('blog.services.api'));

  beforeEach(function(){
    samplePost = {
      id: 1,
      title: 'Hello world!',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };

    samplePost2 = {
      id: 2,
      title: 'Hello world (again)!',
      body: 'Integer ullamcorper erat ac aliquam mollis.',
    };
  });

  describe('NewPostCtrl', function(){
    var $httpBackend, $scope, ctrl;

    beforeEach(inject(function($controller, $rootScope){
        $scope = $rootScope.$new();

        ctrl = $controller('NewPostCtrl', {
          $scope: $scope
        });
    }));

    beforeEach(inject(function($injector){
       $httpBackend = $injector.get('$httpBackend');
       $httpBackend.when('POST', '/api/0/posts/').respond(samplePost);
    }));

    it('should should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('should should bind formData', function(){
      expect($scope.formData).toBeDefined();
    });

    it('should should support saveForm', function(){
      expect($scope.saveForm).toBeDefined();

      $scope.formData = {
        title: samplePost.title,
        body: samplePost.body
      };

      $httpBackend.expectPOST('/api/0/posts/', $scope.formData)
        .respond(201, samplePost);

      $scope.saveForm();

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

  });

  describe('PostDetailsCtrl', function(){
    var $httpBackend, $scope, ctrl;

    beforeEach(inject(function($controller, $injector, $rootScope){
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('POST', '/api/0/posts/').respond(samplePost);

        $scope = $rootScope.$new();

        ctrl = $controller('PostDetailsCtrl', {
          $scope: $scope,
          postDetailsResponse: {data: samplePost}
        });
    }));

    it('should should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('should should bind post', function(){
      expect($scope.post).toBe(samplePost);
    });

    it('should should bind isEditMode', function(){
      expect($scope.inEditMode).toBe(false);
    });

    it('should should bind formData', function(){
      expect($scope.formData).toBeDefined();
    });

    it('should should support saveForm', function(){
      expect($scope.saveForm).toBeDefined();

      $scope.formData = {
        title: samplePost.title,
        body: samplePost.body
      };

      $httpBackend.expectPOST('/api/0/posts/1/', $scope.formData)
        .respond(201, samplePost);

      $scope.saveForm();

      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('PostListCtrl', function(){
    var $scope, ctrl;

    beforeEach(inject(function($controller, $rootScope){
        $scope = $rootScope.$new();

        ctrl = $controller('PostListCtrl', {
          $scope: $scope,
          postListResponse: {
            data: [samplePost, samplePost2]
          }
        });
    }));

    it('should should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('should should bind postList', function(){
      expect($scope.postList.length).toBe(2);
      expect($scope.postList[0].id).toBe(samplePost.id);
      expect($scope.postList[1].id).toBe(samplePost2.id);
    });
  });

});
