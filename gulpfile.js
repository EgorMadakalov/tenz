const gulp = require('gulp');


// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');



gulp.task('default', gulp.series(
    'clean:dev', 
    gulp.parallel('html:dev', 'scss:dev', 'images:dev','files:dev', 'fonts:dev', 'js:dev'),
    gulp.parallel('watch:dev', 'server:dev')
));

gulp.task('docs', gulp.series(
    'clean:docs', 
    gulp.parallel('html:docs', 'scss:docs', 'images:docs','files:docs', 'fonts:docs', 'js:docs'),
    gulp.parallel('server:docs')
));