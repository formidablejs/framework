import HttpException from '../../Http/Exceptions/HttpException'

export default class MaintenanceModeException < HttpException

	prop response\String = 'Service Unavailable'
	prop status\Number = 503
