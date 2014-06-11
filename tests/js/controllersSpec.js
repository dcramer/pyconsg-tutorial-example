'use strict';

describe('controllers', function(){
  beforeEach(module('blog.controllers'));

  describe('PostDetailsCtrl', function(){
    it('should should be defined', inject(function($controller) {
      var ctrl = $controller('PostDetailsCtrl', { $scope: {} });
      expect(ctrl).toBeDefined();
    }));
  })
});
