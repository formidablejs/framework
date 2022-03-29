import Bind from '../../Database/Bind'

export def bind table\String, first\Boolean = true
	new Bind(table, first)
