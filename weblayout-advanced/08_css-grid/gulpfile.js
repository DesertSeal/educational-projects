const { src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');

const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify =  require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');

let isDev = true;

const clean = () => {
    // return del([isDev ? 'dev' : 'prod'])
    return del(['dev', 'prod'])
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest([isDev ? 'dev' : 'prod']))
}

// const styles = () => {
//     return src('src/styles/**/*.css')
//         .pipe(gulpIf(isDev,  sourcemaps.init()))   
//         .pipe(concat('style/style.css'))
        
//         .pipe(autoprefixer({
//             overrBrowsersList: ['Last 5 versions'],
//             cascade: true
//           }))

//         .pipe(cleanCSS({
//             level: 1
//         }))
//         .pipe(gulpIf(isDev, sourcemaps.write()))
//         .pipe(dest(isDev ? 'dev' : 'prod'))
//         .pipe(browserSync.stream())
// }


const styles = () => {
    return src('src/styles/style.scss')
      .pipe(gulpIf(isDev,  sourcemaps.init()))   
      .pipe(concat('style.css'))
       .pipe(sass({
         outputStyle: 'expanded',
       }).on('error', notify.onError()))
      .pipe(groupMedia())
      .pipe(autoprefixer({
        cascade: false,
        grid: true,

        flexbox: true,
      }))
      .pipe(dest(isDev ? 'dev/style' : 'prod/style'))
      .pipe(gulpIf(isDev,  sourcemaps.write())) 
      .pipe(cleanCSS({
        level: 2,
      }))
    //   .pipe(rename({
    //     suffix: '.min'
    //   }))
      .pipe(browserSync.stream())
  };

const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(gulpIf(!isDev, 
                    htmlMin({
                    collapseWhitespace: true,
                    })
    ) )
    .pipe(dest(isDev ? 'dev' : 'prod'))
    .pipe(browserSync.stream())    
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode:{
            stack:{
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest(isDev ? 'dev/images' : 'prod/images'))
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.jpeg',
        'src/images/**/*.png',
        'src/images/**/*.svg',
    ])
    .pipe(image())
    .pipe(dest(isDev ? 'dev/images' : 'prod/images'))
}

const scripts = () => {
    return src([
        'src/js/**/*.js'
        // 'src/js/components/**/*.js'
        // ,         'src/js/main.js'
     ])
    .pipe(gulpIf(isDev,  sourcemaps.init()))   
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpIf(!isDev, uglify().on('error', notify.onError()))  )
    .pipe(gulpIf(isDev,  sourcemaps.write()))   
    .pipe(dest(isDev ? 'dev/js' : 'prod/js'))
    .pipe(browserSync.stream())
}

const watchfiles = () => {
    browserSync.init({
        server: {
            baseDir: isDev ? 'dev' : 'prod'
        }
    })
}

const toProd = (done) => {
    isDev = false;
    done();
  };

const toDev = (done) => {
    isDev = true;
    done();
  };


watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.scss', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)


exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchfiles)

exports.prod = series(toProd, clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchfiles)
exports.dev = series(toDev, clean, resources, htmlMinify,  styles, images, svgSprites, watchfiles)