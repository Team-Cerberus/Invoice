const logger = require('../scripts/config/logger');

const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+-=',
  length = 60;

function get(passHash) {
  let authKey = '';
  authKey += passHash;
  while (authKey.length < length) {
    const index = (Math.random() * chars.length) | 0;
    authKey += chars[index];
  }
  return authKey;
}

logger.info('auth-key-generator.js loaded');
module.exports = {
  get:get
};
