import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { Welcome } from '../resources/views/welcome'

# --------------------------------------------------------------------------
# Web Routes
# --------------------------------------------------------------------------
#
# Here is where you can register API routes for your application. These
# routes are loaded by the RouteServiceResolver within a group which
# is assigned the "session" middleware group.

Route.get '/', do(request\Request)
	view(Welcome, {
		locale: request.locale!
		formidableVersion: request.version
		nodeVersion: process.version
	})
