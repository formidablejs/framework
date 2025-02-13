export class DateTime

	# Register the DateTime query builder methods.
	static def register client\Knex
		client.QueryBuilder.extend('wherePast', self.wherePast)
		client.QueryBuilder.extend('whereFuture', self.whereFuture)
		client.QueryBuilder.extend('whereNowOrPast', self.whereNowOrPast)
		client.QueryBuilder.extend('whereNowOrFuture', self.whereNowOrFuture)
		client.QueryBuilder.extend('whereToday', self.whereToday)
		client.QueryBuilder.extend('whereBeforeToday', self.whereBeforeToday)
		client.QueryBuilder.extend('whereAfterToday', self.whereAfterToday)

	static def wherePast column\string
		return this.where(column, '<', this.client.raw('NOW()'))

	static def whereFuture column\string
		return this.where(column, '>', this.client.raw('NOW()'))

	static def whereNowOrPast column\string
		return this.where(column, '<=', this.client.raw('NOW()'))

	static def whereNowOrFuture column\string
		return this.where(column, '>=', this.client.raw('NOW()'))

	static def whereToday column\string
		return this.where(column, '>=', this.client.raw('CURDATE()'))

	static def whereBeforeToday column\string
		return this.where(column, '<', this.client.raw('CURDATE()'))

	static def whereAfterToday column\string
		return this.where(column, '>', this.client.raw('CURDATE()'))
