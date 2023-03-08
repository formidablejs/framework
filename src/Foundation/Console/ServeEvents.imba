const events = []

export class ServeEvents

	static def add callback\Function
		events.push callback

	static def get
		events
