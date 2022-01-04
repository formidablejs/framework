const { helpers: { multitap } } = require('../../lib');

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
        expect(multitap(user).setName('Donald')).toBeInstanceOf(User);
        expect(multitap(user).setName('Luna').untap()).toBeInstanceOf(User);
    });

    test('Should equal name', () => {
        expect(multitap(user).setAge(24).name).toEqual('Luna');
    });
});