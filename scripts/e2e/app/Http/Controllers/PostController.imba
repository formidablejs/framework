import { @use } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { Controller } from './Controller'
import { Post } from '../../Models/Post'
import { StorePostRequest } from '../Request/StorePostRequest'

export class PostController < Controller

	def index
		Post.fetchAll!

	@use(Request)
	def show request\Request
		const post = await Post.find(request.param('id'))

		if !post then self.notFound 'Post not found.'

		post

	@use(StorePostRequest)
	def store request\StorePostRequest
		request.persist!
