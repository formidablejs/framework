const { ConfigRepository } = require('../../../lib');

module.exports = class Config extends ConfigRepository {

  /**
   * Get registered config.
   *
   * @return {Object}
   */
  get registered() {
    return {
      database: {
        redis: {
          options: {
            prefix: 'formidable_framework_test_',
          },

          default: {
            host: '127.0.0.1',
            port: 6379,
            database: 0,
          }
        }
      },
    };
  }
}