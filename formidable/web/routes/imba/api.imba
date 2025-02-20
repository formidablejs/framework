import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

# --------------------------------------------------------------------------
# API Routes
# --------------------------------------------------------------------------
#
# Here is where you can register API routes for your application. These
# routes are loaded by the RouteServiceResolver within a group which
# is assigned the "jwt" middleware group.

Route.get('/user', do(request\Request)
	without(request.auth!.user!, [
		'password', 'remember_token'
	])
).middleware(['auth'])
