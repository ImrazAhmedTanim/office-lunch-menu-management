const crypto = require('crypto');

function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = {
  jwtSecret: generateRandomString(32), // 32 bytes for a 256-bit key
};
