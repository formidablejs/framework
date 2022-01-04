const { helpers: { tap } } = require('../../lib');

class User {
    constructor() {
        this.name = null;
        this.age = null;
    }

    setName(name) {
        this.name = name;
    }

    setAge(age) {
        this.age = age;
    }
}

describe('Test the tap helper method.', () => {
    let user;

    beforeAll(() => user = new User());

    afterAll(() => user = null);

    test('Should return the target object', () => {
        expect(tap(user).setName('Donald')).toBeInstanceOf(User);
        expect(tap(user, (instance) => instance.setName('Luna'))).toBeInstanceOf(User);
    });

    test('Should equal name', () => {
        expect(tap(user).setAge(24).name).toEqual('Luna');
    });

    test('Should throw an error if the callback is not a valid function', () => {
        expect(() => {
            tap(user, 10);
        }).toThrow(TypeError);
    });
});