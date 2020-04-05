var gulp = require("gulp");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");


/*
* Local Files info (path, output);
*/
var info = {
  css : {
    name : 'style.css', // Имя файла с подключенными стилями
    folder : 'stylesheets/', // Где этот файл лежит
    full_path :  function() { // полный путь с названием файла
      return this.folder + this.name ;
    },
    output_folder: '.', // Папка куда будет сохранен новый файл
  },
  js : {
    name : 'init.js', //Имя JS файла с имортированными в него скриптами
    folder : 'js/', // Где этот файл лежит
    full_path :  function() { // полный путь с названием файла
      return this.folder + this.name ;
    },
    output_folder : '.' // Папка куда будет сохранен новый файл
  },
}



// "Post-css" plugin`s
var postcss_import = require("postcss-import"); // Обьеденяем все css свойства из всех файлов в один.
var postcss_unprefix = require("postcss-unprefix"); // Удаляем повторяющиеся свойства.
var postcss_PresetEnv = require("postcss-preset-env"); // ?
var postcss_colorFunction = require("postcss-color-function"); // ?


// Another PLUGINS
var lost = require("lost"); // Для работы lost grid css, и css функции calc(), чтобы она работала на старых браузерах.
var autoprefixer = require("autoprefixer"); // Дублирует css свойства для всех браузеров таким образом, чтобы они работали на всех браузерах.
var cssnano = require("cssnano"); // Убирает пробелы, пропуски, строки, вообщем сжимает, типа.
var concat = require("gulp-concat"); // Конктенация.

// js
var browserify = require("browserify"); // Подключаем browserify для выполнения функций импортирования в js и т.д.
var babelify = require("babelify"); // Для минимизации js файлы и работы browserify
var source = require("vinyl-source-stream"); // Читает поток данных из browserify в новый файл
var buffer = require("vinyl-buffer"); // Создает поток данных для других модулей
var terser = require("gulp-terser"); // Подключаем gulp-terser (для сжатия JS).
var jsObfuscator = require('gulp-javascript-obfuscator'); // Обфускатор JS-кода



/**
 * CSS task Plugins
 */
var plugins = [
  postcss_import(),
  lost(),
  postcss_unprefix(),
  postcss_PresetEnv({
    stage: 2
  }),
  postcss_colorFunction(),
  autoprefixer(),
  cssnano({
    preset: "default"
  })
];

/**
 * CSS task
 */
gulp.task("css", function() {
    return gulp
    .src(info.css.full_path())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(info.css.output_folder));

});


/**
 * JS task
*/
gulp.task("js", function() {
  
  var b = browserify({
    entries: 'js/init.js',
    debug: true,
    transform: [babelify.configure({
      presets: ["@babel/preset-env"], 
      plugins: ["@babel/plugin-transform-runtime"]
    })]
  });

  return b.bundle()
  .pipe(source("main.min.js"))
  .pipe(buffer())
  .pipe(sourcemaps.init())
    .pipe(terser())
    //.pipe(jsObfuscator())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest(info.js.output_folder));
});


/**
 * Task to watch CSS and JS
 */
gulp.task("w", function() {
  gulp.watch("stylesheets/**/*.css").on('change', gulp.series("css"));
  gulp.watch("js/**/*.js").on('change', gulp.series("js"));
});
