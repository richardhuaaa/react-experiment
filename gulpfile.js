var gulp = require("gulp");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var concat = require("gulp-concat");

gulp.task("jsx", function() {
	var bundler = browserify({
		entries: ["./src/main.jsx"],
		transform: [reactify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	});
	var watcher = watchify(bundler);

	var onUpdate = function() {
		watcher.bundle()
			.pipe(source("main.js"))
			.pipe(gulp.dest("./build/"));
	};

	watcher.on("update", onUpdate);
	watcher.on("log", function (msg) {
		console.log("[" + new Date().toLocaleTimeString() + "] " + msg);
	});
	
	return onUpdate();
});

gulp.task("default", ["jsx"]);
