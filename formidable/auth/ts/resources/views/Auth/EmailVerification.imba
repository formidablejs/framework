import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class EmailVerification < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> "Email Verification"

				<link rel='stylesheet' href='https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<h1> "Verify Account"

				<section[d:flex g:1]>
					"Click"
					<form action=URL.route('email.verify', {
						email: get('email')
						signature: get('signature')
					}) method="POST">
						csrf()

						<input type="hidden" name="email" value=get('email')>

						<button[bw:0 p:0 m:0 bgc:transparent c:#069 fs:unset td:underline cursor:pointer]> "here"
					"to verify your account"
