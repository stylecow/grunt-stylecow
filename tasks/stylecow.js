/*
 * grunt-stylecow
 * https://github.com/oscarotero/grunt-stylecow
 *
 * Copyright (c) 2014 oscarotero
 * Licensed under the MIT license.
 */

'use strict';

var stylecow = require('stylecow');

module.exports = function(grunt) {

    grunt.registerMultiTask('stylecow', 'Execute stylecow plugins with grunt', function() {
        var options = this.options(stylecow.config.defaults);

        stylecow.setConfig(options);

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return stylecow.convertFromFile(filepath).toCode();
            }).join('');

            grunt.file.write(f.dest, src);

            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
};
