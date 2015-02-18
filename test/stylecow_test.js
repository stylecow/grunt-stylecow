'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.stylecow = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  test1: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/styles.css').replace(/\s/g, '');
    var expected = grunt.file.read('test/expected/styles.css').replace(/\s/g, '');
    test.equal(actual, expected, 'Error in the test1');

    test.done();
  },
};
