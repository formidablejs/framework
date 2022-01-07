import type View from '../../Http/View/View'
import ViewResponse from '../../Http/Response/ViewResponse'

export default def view view\View, data\Object|null = null
	ViewResponse.make(view, data)
