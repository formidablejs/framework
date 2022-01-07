const { default: Route } = require('../../../lib/Http/Router/Route');

describe('src/Http/Router/Route', () => {

  it('Should add routes', () => {
    Route.get('/get', () => {});
    Route.post('/post', () => {});
    Route.delete('/delete', () => {});
    Route.put('/delete', () => {});

    const getRoute = Route.all()[0];
    const postRoute = Route.all()[1];
    const deleteRoute = Route.all()[2];
    const putRoute = Route.all()[3];

    expect(getRoute.method).toBe('get');
    expect(postRoute.method).toBe('post');
    expect(deleteRoute.method).toBe('delete');
    expect(putRoute.method).toBe('put');
  });

  it('Should set route name to route', () => {
    Route.get('/', () => {}).name('home');

    expect(Route.has('home')).toBeTruthy();
  });

  it('Should add middleware to route', () => {
    Route.get('/users', () => {}).middleware(['admin']);

    const usersRoute = Route.all()[Route.all().length - 1];

    expect(usersRoute.middleware).toContain('admin');
  });

  it('Should throw an error if route with the same name already exists', () => {
    expect(() => {
      Route.get('/home', () => {}).name('home');
    }).toThrowError("\home\" is already in use by another route.")
  });

  it('Should add the correct prefix to a route', () => {
    Route.group({ prefix: 'users' }, () => {

      Route.group({ prefix: 'posts' }, () => {
        Route.get('/', () => {});
        Route.get('/:id', () => {});
      });

      Route.get('/', () => {});
      Route.get('/:id', () => {});
    });

    const postsRoute = Route.all()[Route.all().length - 4];
    const postRoute = Route.all()[Route.all().length - 3];
    const usersRoute = Route.all()[Route.all().length - 2];
    const userRoute = Route.all()[Route.all().length - 1];

    expect(postsRoute.path).toBe('/users/posts');
    expect(postRoute.path).toBe('/users/posts/:id');
    expect(usersRoute.path).toBe('/users');
    expect(userRoute.path).toBe('/users/:id');
  });

  it('Should throw an error if path is not a string', () => {
    expect(() => {
      Route.get(123, () => {});
    }).toThrowError('Invalid route path.');
  });

});