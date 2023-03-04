type Rules =
	'accepted' | `after:${string}` | `after_or_equal:${string}` | 'alpha' | `alpha_dash` | 'alpha_num' |
	'array' | `before:${string}` | `before_or_equal:${string}` | `between:${number|string},${number|string}`|
	'boolean' | 'confirmed' | 'date' | `digits:${number}` | `digits_between:${number},${number}` |
	`different:${string}` | 'email' | 'file' | `file_size:${number}` | 'hex' | 'image' | `in:${any}` |
	'integer' | `max:${number}` | `min:${number}` | `mimetype:${string}` | `mimes:${string}` | `not_in:${string}` |
	'number' | 'present' | 'required' | `required_if:${string}` | `required_unless:${string}` |
	`required_with:${string}` | `required_with_all:${string}` | `required_without:${string}` |
	`required_without_all:${string}` | `same:${string}` | `size:${string}` | 'string' | 'url' | `regex:${string}` |
	'video'

type ValidationRules<T = void> = {
	[key: string]: Array<Rules | T>
}

export {
	Rules,
	ValidationRules
}
