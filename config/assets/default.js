'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/bootstrap/dist/css/bootstrap.css',
        //'public/lib/bootstrap/dist/css/bootstrap-theme.css',
        'public/lib/angular-ui-select/dist/select.css',
        'public/lib/angular-toastr/dist/angular-toastr.min.css',
        'public/lib/angular-busy/dist/angular-busy.css',
        'public/lib/angular-chart.js/dist/angular-chart.css',
        'public/lib/ng-tags-input/ng-tags-input.css',
        'public/lib/ng-tags-input/ng-tags-input.bootstrap.css',
        'public/lib/angular-ui-switch/angular-ui-switch.css',
        'public/lib/angular-material/angular-material.min.css',
        'public/lib/angular-filemanager/dist/angular-filemanager.min.css',
        'public/lib/bootstrap-material-design/dist/bootstrap-material-design.min.css'
      ],
      js: [
        'public/lib/ace-builds/src-min-noconflict/ace.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/angular-file-upload.js',
        'public/lib/angular-ui-select/dist/select.js',
        'public/lib/angular-toastr/dist/angular-toastr.tpls.js',
        'public/lib/ng-csv/build/ng-csv.js',
        'public/lib/angular-busy/dist/angular-busy.js',
        'public/lib/Chart.js/Chart.js',
        'public/lib/angular-chart.js/dist/angular-chart.js',

        'public/lib/ng-tags-input/ng-tags-input.js',
        'public/lib/angular-ui-switch/angular-ui-switch.js',
        'public/lib/angular-ui-ace/ui-ace.js',
        'public/lib/clipboard/dist/clipboard.js',
        'public/lib/ngclipboard/dist/ngclipboard.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/angular-aria/angular-aria.min.js',
        'public/lib/angular-material/angular-material.min.js',
        'public/lib/angular-filemanager/dist/angular-filemanager.min.js'

      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
