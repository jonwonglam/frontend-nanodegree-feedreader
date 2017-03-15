/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in allFeeds object and ensures that a
         * URL is defined and that the URL is not empty.
         */
        it('URLs are defined and not empty', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).toBeGreaterThan(0);
          });
        });

        /* Loops through each feed and ensures that a name is defined and
         * not empty.
         */
        it ('names are defined and not empty', function() {
          allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).toBeGreaterThan(0);
          });
        });
    });

    describe('The Menu', function() {

      beforeEach(function() {
        body = $('body');
      });
      /* Test ensures that the menu icon is hidden by default
      */
      it('should hide the menu by default', function() {
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
      /* Test ensures that the menu changes visibility when the menu
       * is clicked. Checks that the menu displays when clicked and hides
       * when it is clicked again.
       */
      it('should show and hide the menu', function() {
        $('.menu-icon-link').trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
    });

    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      /* Test ensures that when the loadFeed function is called and completes
       * its work, there is at least a single entry within the .feed container.
       */
      it('should load at least one entry when loadFeed() is called', function(done) {
        expect($('.feed .entry').length).toBeGreaterThan(0);
        done();
      });
    });

    describe('New Feed Selection', function() {
      var initialContentURL = "",
          newContentURL = "";

      beforeEach(function(done) {
        // First async call
        loadFeed(0, function() {
          initialContentURL = $('.entry-link').first().attr('href');
          // Second async call called within the success function of the first,
          // to prevent race conditions.
          loadFeed(1, function() {
            newContentURL = $('.entry-link').first().attr('href');
            done();
          });
        });

      });

      /* Ensures that when a new feed is loaded by the loadFeed function,
       * the content actually changes.
       */
      it('should load new content when feed changes', function(done) {
        expect($('.feed').children().length).toBeGreaterThan(0);
        expect(newContentURL).not.toEqual(initialContentURL);
        done();
      });
    });
}());
