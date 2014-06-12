'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('blog', function() {

  browser.get('/');

  describe('index', function() {

    beforeEach(function() {
      browser.get('/#/');
    });

    it('should render the post list', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Posts/);
    });

  });

  describe('new post', function() {

    beforeEach(function() {
      browser.get('/#/new/post');
    });

    it('should render the page', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/New Post/);
    });

  });

});
