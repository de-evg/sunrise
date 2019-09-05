"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var minify = require("gulp-minify");
var htmlminify = require("gulp-htmlmin");

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/pixel-glass/**"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("normalize", function () {
  return gulp.src("source/css/normalize.css")
    .pipe(csso())
    .pipe(rename("normalize.min.css"))
    .pipe(gulp.dest("build/css"));
});

gulp.task("compress", function() {
  return gulp.src("source/js/*.js")
    .pipe(minify({
      ext:{
        min:".min.js"
      },
      exclude: ["tasks"],
      ignoreFiles: ["*.min.js", "-min.js"]
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png, jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
   ]))
    .pipe(gulp.dest("build"));
})

gulp.task("htmlmin", function() {
  return gulp.src("source/*.html")
    .pipe(htmlminify({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("imagemin", gulp.series("images"));

gulp.task("webp", gulp.series("webp"));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "normalize",
  "compress",
  "sprite",
  "html",
  "htmlmin"
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("compress", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "htmlmin", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
})

gulp.task("start", gulp.series("build", "server"));
