var gulp = require('gulp');
var sync = require('browser-sync');
var dest = require('gulp-dest');
var reload = sync.reload;
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var styledocco = require('gulp-styledocco');
var sass = require( 'gulp-sass' );
var prefix = require( 'gulp-autoprefixer' );


gulp.task('styledocco', function () {
	gulp.src('app/css/*.css')
		.pipe(styledocco({
			out: 'docs',
			name: 'Decker Library',
			'no-minify': true,
		}))	
});


//Convert SASS to CSS
gulp.task( 'css', function() { 
  return gulp.src( 'app/css/sass/main.scss' )
  // 	.pipe(styledocco({
		// 	out: 'docs',
		// 	name: 'Decker Library',
		// 	'no-minify': true,
		// }))
     .pipe(sass())
     .pipe( prefix('last 3 versions') )
     .pipe( gulp.dest( 'app/css' ) );
});  

// Setup server
gulp.task('sync', function () {
	sync({
			server: {
				baseDir: './app',
				directory: true,
				index: 'index.html',
				routes: {
					"/bower_components": "bower_components",
					"/docs": "docs"
			}
		}
	});
});

// Watch Files
gulp.task('watch', ['sync', 'css'], function () {
	gulp.watch('app/*.html', reload);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/css/sass/*.scss', ['css', reload] );
	gulp.watch('app/css/sass/*/*.scss', ['css', reload] );
	gulp.watch('app/css/*.css', ['styledocco']);
});

// Watch Bower
gulp.task('wiredep', function (){
	gulp.src('app/*.html')
		.pipe(wiredep({
			directory: 'bower_components',
			ignorePath: '../'
		}))
		.pipe(gulp.dest('app'));
});