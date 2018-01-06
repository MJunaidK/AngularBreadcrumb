const gulp= require('gulp');
const concat=require('gulp-concat');
const browserSync=require('browser-sync').create();

const scripts=require('./scripts');
const styles=require('./styles');

const browserify =require('browserify');
const source =require('vinyl-source-stream');
const buffer=require('vinyl-buffer');
const sourcemaps=require('gulp-sourcemaps');



var devMode =false;

gulp.task('css',function(){
	gulp.src(styles)
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//This task is not needed as browserify will bundle all javasript into one bundle file
gulp.task('js',function(){
	gulp.src(scripts)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('html',function(){
	gulp.src('./src/templates/**/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({
			stream:true
		}));
});


gulp.task('build',function(){
	gulp.start(['css','js','html'])
});

//BrowserSync makes your tweaking and testing faster by synchronizing file changes and interactions across many devices.
//BrowserSync creates a small server
// As soon as BrowserSync detects an action it performs a page reload.

gulp.task('browser-sync',function(){
	browserSync.init(null,{
		open : true,
		server:{
			baseDir: 'dist'
		}
	});
});


// Browserify helps you to bring node modules to browser.
//First of all you need to set browserify to generate source maps by setting the debug option to true, then if you want the pre babelify source maps you need to configure babelify to generate source maps
gulp.task('browserify',function(){
	return browserify('src/js/app.js',{
		debug:true,
		paths:['./node_modules','./src']
	}).transform("babelify",{presets:["es2015"]})
	  .bundle()
	  //pass the desired output filename to vinyl-source-stream
	  .pipe(source('bundle1.js'))
	  .pipe(buffer())
	  .pipe(sourcemaps.init({loadMaps:true}))
	  .pipe(sourcemaps.write('./'))
	  //start piping stream to rasks!
	  .pipe(gulp.dest('./dist/'));
});


gulp.task('start',function(){
	devmode =true;
	gulp.start(['build','browser-sync','browserify']);
	gulp.watch(['./src/css/**/*.css'],['css']);
	gulp.watch(['./src/js/**/*.js'],['js']);
	gulp.watch(['./src/templates/**/*.html'],['html']);
	
})
