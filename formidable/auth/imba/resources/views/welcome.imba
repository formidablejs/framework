import { helpers } from '@formidablejs/framework'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Welcome < View

	def render
		const user\User = self.get('user', '')
		const locale\string = self.get('locale', helpers.config('app.locale', new String)).replace(/_/g, '-')
		const title\string = helpers.config('app.name', 'Formidable')

		css
			ul list-style-type: none p:0
			li d:inline-block m:0 10px

		<html lang="{locale}">
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> title

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<div[ta:center d:flex ai:center jc:center h:80vh]>
					<div>
						<section>
							<img[w:150px p:10px] alt="Formidable logo" src="/formidable.svg">

						<section[d:flex g:1 jc:center]>
							<p[fw:bolder]> "Congrats!"
							<p> "Your app is ready with Auth enabled"

						<p[font-style:italic]> "Your frontend is located at { <code> './resources/frontend' }"

						<section[d:flex g:1 jc:center]>
							if user
								<form action=URL.route('logout') method="POST">
									csrf()

									<button[bw:0 p:2 bgc:black c:white cursor:pointer td:underline]> "Logout"

								<p[lh:5px]> "Hello, {user.name} 👋"
							else
								<a[p:2 bgc:black c:white] href="/register"> "Register"
								<a[p:2 bgc:black c:white] href="/login"> "Login"

						<section>
							<h3[m:40px 0 0]> "Essential Links"

							<ul>
								<li> <a href="https://formidablejs.org/" target="_blank" rel="noopener"> "Formidable Docs"
								<li> <a href="https://imba.io/" target="_blank" rel="noopener"> "Imba Docs"
								<li> <a href="https://github.com/formidablejs" target="_blank" rel="noopener"> "Github"
								<li> <a href="https://twitter.com/formidablejs" target="_blank" rel="noopener"> "Twitter"
