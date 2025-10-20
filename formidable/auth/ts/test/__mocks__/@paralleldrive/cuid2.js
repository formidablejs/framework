//Mock for @paralleldrive/cuid2

module.exports = {
    createId: jest.fn(() => 'mock-id'),
    init: jest.fn(),
    getConstants: jest.fn(() => ({})),
    isCuid: jest.fn(() => true)
};
