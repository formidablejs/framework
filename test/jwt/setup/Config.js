const { ConfigRepository } = require('../../../lib');

module.exports = class Config extends ConfigRepository {

  /**
   * Get registered config.
   *
   * @return {Object}
   */
  get registered() {
    return {
      app: {
        url: 'http://localhost:3000',
      },
    };
  }
}