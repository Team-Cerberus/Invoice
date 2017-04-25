SystemJS.config({
  transpiler: 'plugin-babel',
  map: {
    // SystemJS Modules
    'plugin-babel': 'libraries/systemjs-plugin-babel/plugin-babel',
    'systemjs-babel-build': 'libraries/systemjs-plugin-babel/systemjs-babel-browser',

    // Application Modules
    'app': 'scripts/app',
    'router': 'scripts/router',
    'homeController': 'scripts/controllers/home',
    
    // Libraries
    'jquery': 'libraries/jquery/dist/jquery.min',
  },
  packages: {
    '/': {
      defaultExtension: 'js'
    }
  }
});

System.import('app');