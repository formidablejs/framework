import { @use } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'
import { DB } from '@formidablejs/framework'
import { StorePostRequest } from '../Request/StorePostRequest'

export class PostController < Controller

	def index
		await DB.table('posts')

	@use(Request)
	def show request\Request
		const post = await DB.table('posts').where('id', request.param('id')).first!

		if !post then self.notFound 'Post not found.'

		post

	@use(StorePostRequest)
	def store request\StorePostRequest
		request.persist!
