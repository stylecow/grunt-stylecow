/*
 * grunt-stylecow
 * https://github.com/oscarotero/grunt-stylecow
 *
 * Copyright (c) 2015 oscarotero
 * Licensed under the MIT license.
 */

'use strict';

var stylecow = require('stylecow-core'),
    plugins  = require('stylecow-plugins');

module.exports = function(grunt) {

    grunt.registerMultiTask('stylecow', 'Execute stylecow with grunt', function() {
        var config = this.options({}),
            tasks  = new stylecow.Tasks(),
            coder  = new stylecow.Coder(config.code);

        coder.sourceMap(config.map || 'none');

        if (config.support) {
            tasks.minSupport(config.support);
        }

        tasks.use(plugins(config.plugins));

        if (config.modules) {
            config.modules.forEach(function (module) {
                stylecow.use(require(module));
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

            tasks.run(css);

            var code = coder.run(css, f.dest, undefined, config.previousSourceMap);

            grunt.file.write(f.dest, code.css);
            grunt.log.writeln('File "' + f.dest + '" created.');

            if ((typeof config.map === 'string') && code.map) {
                grunt.file.write(config.map, code.map);
                grunt.log.writeln('File "' + config.map + '" created.');
            }
        });
    });
};
