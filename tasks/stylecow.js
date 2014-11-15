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
        var options = this.options(stylecow.defaults);

        stylecow.setConfig(options);

        this.files.forEach(function(f) {
            var css;

            f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                var parsed = stylecow.createFromFile(filepath);

                if (!css) {
                    css = parsed;
                } else {
                    stylecow.merge(css, parsed);
                }
            });

            css.executeTasks(stylecow.tasks);

            var code = new stylecow.Code(css, {
                file: f.dest,
                style: options.code,
                sourceMap: options.sourceMap,
                sourceMapFile: options.sourceMapFile
            });

            grunt.file.write(f.dest, code.code);
            grunt.log.writeln('File "' + f.dest + '" created.');

            if (options.sourceMapFile) {
                grunt.file.write(f.dest, code.mapString);
                grunt.log.writeln('File "' + options.sourceMapFile + '" created.');
            }
        });
    });
};
