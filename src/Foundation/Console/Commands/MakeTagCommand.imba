import { Prop } from '@formidablejs/console'
import { MakeResourceCommand } from './MakeResourceCommand'
import Tag from '@formidablejs/stubs/src/stubs/tag/tag'

export class MakeTagCommand < MakeResourceCommand

	get signature
		'make:tag {name}'

	get props
		{
			name: Prop.string!.description('The name of the tag')
		}

	get description
		'Create a new imba tag'

	get resource
		'Tag'

	get stub
		new Tag(self.argument('name'), { }, 'tag')
