const logger = require('../scripts/config/logger');

const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+-=',
  length = 60;

function get(id) {
  var authKey = '';
  authKey += id;
  while (authKey.length < length) {
    var index = (Math.random() * chars.length) | 0;
    authKey += chars[index];
  }
  return authKey;
}

logger.info('auth-key-generator.js loaded');
module.exports = {
  get:get
};
