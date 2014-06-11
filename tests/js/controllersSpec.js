'use strict';

describe('controllers', function(){
  var samplePost, samplePost2;

  beforeEach(module('blog.controllers'));

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

  describe('PostDetailsCtrl', function(){
    var scope, ctrl;

    beforeEach(inject(function($controller){
        scope = {};

        ctrl = $controller('PostDetailsCtrl', {$scope: scope, postDetailsResponse: {
          data: samplePost
        }});
    }));

    it('should should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('should should bind post', function(){
      expect(scope.post).toBe(samplePost);
    });
  });

  describe('PostListCtrl', function(){
    var scope, ctrl;

    beforeEach(inject(function($controller){
        scope = {};

        ctrl = $controller('PostListCtrl', {$scope: scope, postListResponse: {
          data: [samplePost, samplePost2]
        }});
    }));

    it('should should be defined', function(){
      expect(ctrl).toBeDefined();
    });

    it('should should bind postList', function(){
      expect(scope.postList.length).toBe(2);
      expect(scope.postList[0].id).toBe(samplePost.id);
      expect(scope.postList[1].id).toBe(samplePost2.id);
    });
  });

});
