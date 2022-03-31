import { DB } from '@formidablejs/framework'
import { FormRequest } from '@formidablejs/framework'

export class StorePostRequest < FormRequest

	def authorize
		true

	def rules
		{
			body: 'string|min:4|required'
		}

	def persist
		DB.table('posts').insert({
			body: this.input('body')
		})
