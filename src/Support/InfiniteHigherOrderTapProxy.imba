export class InfiniteHigherOrderTapProxy

	def constructor object
		return new Proxy(object, {
			get: do(target, prop)
				if prop == 'untap' then return do target

				if typeof target[prop] == 'function'
					return do(...args)
						target[prop].apply(
							target, args
						)

						this

				target[prop]
		})
