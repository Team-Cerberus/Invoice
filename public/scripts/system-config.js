SystemJS.config({
  transpiler: 'plugin-babel',
  map: {
    // SystemJS Modules
    'plugin-babel': 'libraries/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': 'libraries/systemjs-plugin-babel/systemjs-babel-browser.js',

    // Application Modules
    'index': 'scripts/index',
    'router': 'scripts/router',
    'data': 'scripts/data',
    'requester': 'scripts/requester',
    'templates': 'scripts/templates',
    'mainController': 'scripts/controllers/main',
    'userController': 'scripts/controllers/user',
    'invoiceController': 'scripts/controllers/invoice',
    // Models
    'invoice': 'models/invoice',
    'seller': 'models/seller',
    'entity': 'models/entity',
    'invoiceRow': 'models/seller',
    // Libraries
    'jquery': 'libraries/jquery/dist/jquery.min',
	  'bootstrap': 'js/bootstrap.min',
    'handlebars': 'libraries/handlebars/dist/handlebars',
    'cryptojs': 'libraries/crypto-js/crypto-js',
    'toastr': 'libraries/toastr/build/toastr.min',
    // Externals (hard dependency on SystemJS)
    'externals': 'utilities/externals',
    // Sample data for dev
    'devDataContainer': 'sample-data/sample-data'
  },
  packages: {
    '/': {
      defaultExtension: 'js'
    }
  }
});

System.import('index');
