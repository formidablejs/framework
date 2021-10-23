import { helpers } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Welcome < View

	def render
		const locale = self.get('locale', helpers.config('app.locale', new String)).replace(/_/g, '-')
		const title = helpers.config('app.name', 'Formidable')

		<html lang="{locale}">
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> title

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="./welcome">

			<body[m:0 ff:Nunito]>
				<div[pos:relative d:flex ji:center min-height:100vh bg:gray1 ai:center pt@sm:0]>
					<div[max-width:72rem mx:auto px@sm:6 px@lg:8]>
						<div[ta:center pt:1- pt@sm:0 mb:10]>
							<img[w:35] src="/formidable.png">

						<div[mb:10]>
							<h4[fs:1.5rem lh:2rem fw:lighter ta:center]>
								"Yey! You have successfully created a new Formidable project."

						<div[ml:5 fs:0.875rem lh:1.25rem ta:center c:gray5 ml@sm:0]>
							"Formidable v{self.get('formidableVersion', 'undefined')} (Node {self.get('nodeVersion', 'undefined')})"
