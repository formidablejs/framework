export class HigherOrderTapProxy

	def constructor object
		return new Proxy(object, {
			get: do(target, prop)
				if typeof target[prop] == 'function'
					return do(...args)
						target[prop].apply(
							target, args
						)

						target

				target[prop]
		})
