import Database from '../../Database/Database'

export default def now
	# new Date().toISOString().replace('Z','').replace('T', ' ')
	# 'CURRENT_TIMESTAMP'
	Database.fn.now!
