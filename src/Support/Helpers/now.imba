const Database = require '../../Database/Database'

module.exports = def now
	# new Date().toISOString().replace('Z','').replace('T', ' ')
	# 'CURRENT_TIMESTAMP'
	Database.fn.now!
