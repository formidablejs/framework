import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { View } from '@formidablejs/framework'
import { Props } from '../imba/store'

export class App < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> config('app.name', 'Formidable')

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="../imba/main.imba">

			<body>
				<Props html:locale=locale>

				<script type="module" src="../imba/main.imba">
