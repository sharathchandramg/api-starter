let gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    tsProject = tsc.createProject("tsconfig.json"),
    del = require("del"),
    git = require("gulp-git"),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps");

gulp.task("clean:dist", (done) => {
    del.sync(["dist/**/*"]);
    done();
});

gulp.task("compile-ts", (done) => {
    tsProject
        .src()
        .pipe(tsProject())
        .on("error", (error) => {
            console.log("Typescript compilation exited with " + error);
            process.exit(1);
        })
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"));

    done();
});

gulp.task("copy-files", (done) => {
    gulp.src("package.json").pipe(gulp.dest("./dist"));
    gulp.src("package-lock.json").pipe(gulp.dest("./dist"));
    gulp.src("ecosystem.config.json").pipe(gulp.dest("./dist"));

    done();
});

gulp.task("default", gulp.series("clean:dist", "compile-ts", "copy-files"));