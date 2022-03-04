const { current } = require '../storage/framework/address.json'
const { SuperTest } = require 'supertest'
const request = require 'supertest'

describe 'Database', do
	# @type {SuperTest}
	let app

	beforeAll do app = request current

	it '/ (PUT: Create Post)', do
		app.put('/posts')
			.send({ body: 'hello world' })
			.expect(200)

	it '/ (GET: Fetch all posts)', do
		app.get('/posts')
			.expect(200)

	it '/ (GET: Fetch 1 post)', do
		app.get('/posts/1')
			.expect(200)

	it '/ (GET: Fetch 1 post) - throw error', do
		app.get('/posts/100000')
			.expect(404)
