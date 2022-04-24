"use strict";

const scssSrcPath = "scss/";
const cssDestPath = "dist/css/";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const rename = require("gulp-rename");

function watchFiles() 
{
    gulp.watch([scssSrcPath + "**/*.scss"], cssTask);
}

function cssTask()
{
    return gulp
        .src(scssSrcPath + "index.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(postcss([
            postcssPresetEnv()
        ]))
        .pipe(rename("style.css"))
        .pipe(gulp.dest(cssDestPath));
}

const defaultTask = gulp.series(
    cssTask,
    watchFiles
);

const buildTask = gulp.series(
    cssTask
);

exports.default = defaultTask;
exports.build = buildTask;