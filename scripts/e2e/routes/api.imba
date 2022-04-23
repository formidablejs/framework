import { PostController } from '../app/Http/Controllers/PostController'
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

Route.get('/', do(request\Request)
	request.translate 'index.hello', 'Hello World'
).name('hello').middleware(['lang'])

# add posts routes.
Route.group { prefix: 'posts' }, do
	Route.get '/', [PostController, 'index']
	Route.get '/:id', [PostController, 'show']
	Route.put '/', [PostController, 'store']

Route.group { prefix: 'routes' }, do
	Route.get 'invoke', class invokable
		def __invoke
			'hello'

	Route.get 'function', do
		'hello'
