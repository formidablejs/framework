export class DateTime

	def wherePast column\string
		return this.where(column, '<', this.client.raw('NOW()'))

	def whereFuture column\string
		return this.where(column, '>', this.client.raw('NOW()'))

	def whereNowOrPast column\string
		return this.where(column, '<=', this.client.raw('NOW()'))

	def whereNowOrFuture column\string
		return this.where(column, '>=', this.client.raw('NOW()'))

	def whereToday column\string
		return this.where(column, '>=', this.client.raw('CURDATE()'))

	def whereBeforeToday column\string
		return this.where(column, '<', this.client.raw('CURDATE()'))

	def whereAfterToday column\string
		return this.where(column, '>', this.client.raw('CURDATE()'))
