const Config = require('./Config');

describe('src/Config/Repository', () => {
  let config;

  beforeAll(() => {
    config = new Config;
  });

  afterAll(() => {
    config = null;
  });

	it('Should return "Test App"', () => {
		expect(config.get('app.name'))
      .toBe('Test App');
	});

  it('Should return "Test App"', () => {
		expect(config.get('app.names', 'Test App'))
      .toBe('Test App');
	});

  it('Should return true', () => {
		expect(config.has('app.name'))
      .toBeTruthy();
	});

  it('Should return false', () => {
		expect(config.has('app.names'))
      .toBeFalsy();
	});

  it('Should throw TypeError', () => {
		expect(() => {
      config.has([])
    }).toThrow(TypeError);
	});
})
