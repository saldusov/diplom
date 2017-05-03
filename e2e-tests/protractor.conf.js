//jshint strict: false
exports.config = {
  baseUrl: 'http://localhost:5000/',
  
  specs: ['*.js'],

  capabilities: {
  	'browserName': 'chrome'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
  	defaultTimeoutInterval: 30000
  }
};