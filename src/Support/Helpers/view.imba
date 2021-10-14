import type { View } from '../../Http/Response/ViewResponse'
import ViewResponse from '../../Http/Response/ViewResponse'

export default def view view\View, data\Object|null = null
	ViewResponse.make(view, data)
