export default {

	# --------------------------------------------------------------------------
	# Authentication Defaults
	# --------------------------------------------------------------------------

	defaults: {
		protocol: 'web'
	}

	# --------------------------------------------------------------------------
	# Authentication Protocols
	# --------------------------------------------------------------------------

	protocols: {
		api: {
			provider: 'jwt'
		}

		web: {
			provider: 'session'
		}
	}

	# --------------------------------------------------------------------------
	# Providers
	# --------------------------------------------------------------------------
	#
	# Here you can define your authentication providers. Providers are used to
	# specify how your application should authenticate users.

	providers: {
		jwt: {
			driver: 'jwt'
			hidden: [
				'id'
				'password'
				'remember_token'
			]
			table: 'users'
		}

		session: {
			driver: 'session'
			table: 'users'
		}
	}

	# --------------------------------------------------------------------------
	# Remember Me
	# --------------------------------------------------------------------------
	#
	# The "remember" option is used to specify how long the user should be
	# remembered in the application. By default, the user will be remembered
	# for 6 months if the "remember_me" flag is set to true in the login body.

	remember: 60 * 60 * 24 * 180
}
