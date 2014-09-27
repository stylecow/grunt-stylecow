# grunt-stylecow

> Execute stylecow plugins with grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-stylecow --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-stylecow');
```

## The "stylecow" task

### Overview
In your project's Gruntfile, add a section named `stylecow` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    stylecow: {
        options: {
            "support": {
                "explorer": 10,
                "firefox": 30,
                "chrome": 35,
                "safari": 6,
                "opera": 22,
                "android": 4,
                "ios": 6
            },
            "plugins": [
                "color",
                "fixes",
                "flex",
                "import",
                "initial",
                "linear-gradient",
                "matches",
                "nested-rules",
                "prefixes",
                "rem",
                "variables"
            ],
            "code": "normal"
        },
        dist: {
            files: {
                'css/styles.min.css': ['./css/styles.css']
            }
        }
    }
});
```

### Options

#### options.support
Type: `Object`

Minimal browser support required

#### options.plugins
Type: `Array`

The stylecow plugins to execute. You must install the plugins before, using npm. For example, to install the "prefixes" plugin:

```shell
npm install stylecow-plugin-prefixes --save-dev
```

#### options.code
Type: `String`

The output code style used. Can be "normal" or "minify"
