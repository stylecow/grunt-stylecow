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

    grunt.registerMultiTask('stylecow', 'Execute stylecow with grunt', function() {
        var config = this.options({});

        if (config.support) {
            stylecow.minSupport(config.support);
        }

        if (config.plugins) {
            config.plugins.forEach(function (plugin) {
                stylecow.loadPlugin(plugin);
            });
        }

        if (config.modules) {
            config.modules.forEach(function (module) {
                stylecow.loadNpmModule(module);
            });
        }

        this.files.forEach(function(f) {
            var css;

            f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }

                return true;
            })
            .forEach(function(filepath) {
                var parsed = stylecow.parseFile(filepath);

                if (!css) {
                    css = parsed;
                } else {
                    while (parsed[0]) {
                        css.push(parsed[0]);
                    }
                }
            });

            stylecow.run(css);

            var code = new stylecow.Coder(css, {
                file: f.dest,
                style: config.code,
                previousSourceMap: config.previousSourceMap,
                sourceMap: config.map
            });

            grunt.file.write(f.dest, code.code);
            grunt.log.writeln('File "' + f.dest + '" created.');

            if ((typeof config.map === 'string') && config.map !== 'embed') {
                grunt.file.write(config.map, JSON.stringify(code.map));
                grunt.log.writeln('File "' + config.map + '" created.');
            }
        });
    });
};
