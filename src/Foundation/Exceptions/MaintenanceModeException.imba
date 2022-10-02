import HttpException from '../../Http/Exceptions/HttpException'

export default class MaintenanceModeException < HttpException

	prop response\string = 'Service Unavailable'
	prop status\number = 503
