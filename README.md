# ![grunt](https://avatars2.githubusercontent.com/u/1630826?v=3&s=40) Hasp Grunt task

Run [Hasp](https://github.com/djanowski/hasp) precompiler in your Grunt pipeline.

## Sample usage

```js
grunt.initConfig({
  hasp: {
    compile: {
      src: ['src/*.hcss'],
      dest: 'dest/'
    }
  }
});
```

## Examples

Task is minimalistic and provides no options at the moment.

Example of how to use it is stored in `example/` directory. Example translates `.hcss` files from `input/` to `output/`..

To run the example, clone repository and run:

```shell
npm test
```

___
*original hasp repo [link](https://github.com/djanowski/hasp)*

*for gulp plugin see [gulp-hasp-css](https://www.npmjs.com/package/gulp-hasp-css)*
