const autoBind = require('auto-bind');
const createHttpError = require('http-errors');

class UserService {
  constructor() {
    autoBind(this);
  }
}

module.exports = new UserService();
