import Database from './Database'
import pluralize from 'pluralize'

export default class Repository

	get tableName
		const className = this.constructor.name.split(/(?=[A-Z])/)

		if className.length > 0 && className[className.length - 1].toLowerCase() == 'repository'
			className.pop!

		pluralize(className.join('_').toLowerCase())

	get db
		Database

	get database
		Database

	get table
		const query = Database.table(self.tableName)

		if this.hidden && Array.isArray(this.hidden)
			query.hidden(this.hidden)

		query

	get routeKeyName\string
		'id'

	static get primaryKey\string
		'id'

	static def query
		(new self).table

	static def find value
		const query = self.query!

		query.where(self.primaryKey, value).first!

	static def first
		const query = self.query!

		query.first!

	static def insert ...args
		const query = self.query!

		query.insert.apply(query,args)

	static def create ...args
		const query = self.query!

		query.create.apply(query,args)

	static def delete ...args
		const query = self.query!

		query.delete.apply(query,args)

	static def del ...args
		const query = self.query!

		query.del.apply(query,args)

	static def truncate
		const query = self.query!

		query.truncate!

	static def join ...args
		const query = self.query!

		query.join.apply(query, args)

	static def joinRaw ...args
		const query = self.query!

		query.joinRaw.apply(query, args)

	static def innerJoin ...args
		const query = self.query!

		query.innerJoin.apply(query, args)

	static def leftJoin ...args
		const query = self.query!

		query.leftJoin.apply(query, args)

	static def leftOuterJoin ...args
		const query = self.query!

		query.leftOuterJoin.apply(query, args)

	static def rightJoin ...args
		const query = self.query!

		query.rightJoin.apply(query, args)

	static def rightOuterJoin ...args
		const query = self.query!

		query.rightOuterJoin.apply(query, args)

	static def outerJoin ...args
		const query = self.query!

		query.outerJoin.apply(query, args)

	static def fullOuterJoin ...args
		const query = self.query!

		query.fullOuterJoin.apply(query, args)

	static def crossJoin ...args
		const query = self.query!

		query.crossJoin.apply(query, args)

	static def where ...args
		const query = self.query!

		query.where.apply(query, args)

	static def whereNot ...args
		const query = self.query!

		query.whereNot.apply(query, args)

	static def whereIn ...args
		const query = self.query!

		query.whereIn.apply(query, args)

	static def whereNull ...args
		const query = self.query!

		query.whereNull.apply(query, args)

	static def whereNotNull ...args
		const query = self.query!

		query.whereNotNull.apply(query, args)

	static def whereExists ...args
		const query = self.query!

		query.whereExists.apply(query, args)

	static def whereNotExists ...args
		const query = self.query!

		query.whereNotExists.apply(query, args)

	static def whereBetween ...args
		const query = self.query!

		query.whereBetween.apply(query, args)

	static def whereNotBetween ...args
		const query = self.query!

		query.whereNotBetween.apply(query, args)

	static def whereRaw ...args
		const query = self.query!

		query.whereRaw.apply(query, args)

	static def whereLike ...args
		const query = self.query!

		query.whereLike.apply(query, args)

	static def whereILike ...args
		const query = self.query!

		query.whereILike.apply(query, args)

	static def whereJsonObject ...args
		const query = self.query!

		query.whereJsonObject.apply(query, args)

	static def whereJsonPath ...args
		const query = self.query!

		query.whereJsonPath.apply(query, args)

	static def whereJsonSupersetOf ...args
		const query = self.query!

		query.whereJsonSupersetOf.apply(query, args)

	static def whereJsonSubsetOf ...args
		const query = self.query!

		query.whereJsonSubsetOf.apply(query, args)

	static def groupBy ...args
		const query = self.query!

		query.groupBy.apply(query, args)

	static def groupByRaw ...args
		const query = self.query!

		query.groupByRaw.apply(query, args)

	static def orderBy ...args
		const query = self.query!

		query.orderBy.apply(query, args)

	static def orderByRaw ...args
		const query = self.query!

		query.orderByRaw.apply(query, args)

	static def having ...args
		const query = self.query!

		query.having.apply(query, args)

	static def havingRaw ...args
		const query = self.query!

		query.havingRaw.apply(query, args)

	static def havingIn ...args
		const query = self.query!

		query.havingIn.apply(query, args)

	static def havingNotBetween ...args
		const query = self.query!

		query.havingNotBetween.apply(query, args)

	static def havingBetween ...args
		const query = self.query!

		query.havingBetween.apply(query, args)

	static def havingNotIn ...args
		const query = self.query!

		query.havingNotIn.apply(query, args)

	static def min ...args
		const query = self.query!

		query.min.apply(query, args)

	static def max ...args
		const query = self.query!

		query.max.apply(query, args)

	static def sum ...args
		const query = self.query!

		query.sum.apply(query, args)

	static def sumDistinct ...args
		const query = self.query!

		query.sumDistinct.apply(query, args)

	static def avg ...args
		const query = self.query!

		query.avg.apply(query, args)

	static def avgDistinct ...args
		const query = self.query!

		query.avgDistinct.apply(query, args)

	static def offset offset\number, options = null
		const query = self.query!

		query.offset(offset, options)

	static def limit limit\number, options = null
		const query = self.query!

		query.limit(limit, options)

	static def count ...args
		const query = self.query!

		query.count.apply(query, args)

	static def countDistinct ...args
		const query = self.query!

		query.countDistinct.apply(query, args)

	static def pagination ...args
		const query = self.query!

		query.pagination.apply(query, args)

	static def autoPaginate ...args
		const query = self.query!

		query.autoPaginate.apply(query, args)

	static def softDelete
		const query = self.query!

		query.softDelete!

	static def restore
		const query = self.query!

		query.restore!

	static def withTrashed
		const query = self.query!

		query.withTrashed!

	static def withoutTrashed
		const query = self.query!

		query.withoutTrashed!

	static def onlyTrashed
		const query = self.query!

		query.onlyTrashed!

	static def get ...args
		const query = self.query!

		query.get.apply(query, args)

	def get ...args
		const query = self.table!

		query.get.apply(query, args)

	static def belongsTo ...args
		const query = self.query!

		query.belongsTo.apply(query, args)

	static def hasOne ...args
		const query = self.query!

		query.hasOne.apply(query, args)

	static def hasMany ...args
		const query = self.query!

		query.hasMany.apply(query, args)

	static def belongsToMany ...args
		const query = self.query!

		query.belongsToMany.apply(query, args)
