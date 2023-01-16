import { AuthController } from '../app/Http/Controllers/AuthController'
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { view } from '@formidablejs/framework'
import { Welcome } from '../resources/views/welcome'

/**
 * --------------------------------------------------------------------------
 * Web Routes
 * --------------------------------------------------------------------------
 *
 * Here is where you can register web routes for your application. These
 * routes are loaded by the RouteServiceResolver within a group which
 * is assigned the "session" middleware group.
 */

Route.get('/', (request: Request) => {
	return view(Welcome, {
		locale: request.locale(),
		user: request.auth().check() ? request.user() : null
	})
}).middleware(['verified']).name('welcome')

Route.group({ middleware: ['guest'] }, () => {
	Route.get('/login', [AuthController, 'login']).name('showLogin')
	Route.get('/register', [AuthController, 'register']).name('showRegister')
	Route.get('/forgot-password', [AuthController, 'forgot']).name('showForgotPassword')
	Route.get('/password/reset', [AuthController, 'reset']).middleware(['signed']).name('showPasswordReset')
})

Route.group({ middleware: ['auth'] }, () => {
	Route.get('/email/verify', [AuthController, 'verify']).name('showVerify')
	Route.get('/email/unverified', [AuthController, 'unverified']).name('showUnverified')
})
