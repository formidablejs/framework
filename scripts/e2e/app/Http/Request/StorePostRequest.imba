import { FormRequest } from '@formidablejs/framework'
import { Post } from '../../Models/Post'

export class StorePostRequest < FormRequest

	def authorize
		true

	def rules
		{
			body: 'string|min:4|required'
		}

	def persist
		new Post({
			body: this.input('body')
		}).save!
