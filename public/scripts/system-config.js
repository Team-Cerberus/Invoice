SystemJS.config({
  transpiler: 'plugin-babel',
  map: {
    // SystemJS Modules
    'plugin-babel': 'libraries/systemjs-plugin-babel/plugin-babel',
    'systemjs-babel-build': 'libraries/systemjs-plugin-babel/systemjs-babel-browser',

    // Application Modules
    'index': 'scripts/index',
    'router': 'scripts/router',
    'requester': 'scripts/requester',
    'templates': 'scripts/templates',
    'homeController': 'scripts/controllers/home',
    'aboutController': 'scripts/controllers/about',
    // Libraries
    'jquery': 'libraries/jquery/dist/jquery.min'
  },
  packages: {
    '/': {
      defaultExtension: 'js'
    }
  }
});

System.import('index');
