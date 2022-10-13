import { Context } from '../../Foundation/Context'

def context target
	Context.inject target

exports.context = context
exports.@context = context
