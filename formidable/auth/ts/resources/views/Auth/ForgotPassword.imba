import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class ForgotPassword < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> "Forgot Password"

				<link rel='stylesheet' href='https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<h1> "Forgot your password?"

				<form action=URL.route('password.forgot') method="POST">
					csrf()

					<label[d:block mb:3]>
						"Email Address"
						<input[d:block bw:1px] [bc:red5]=hasError('email') name="email" type="email" placeholder="Email Address" value=old('email') required>

						if hasError('email')
							<p[c:red5]> error for error in error('email')

						if hasSession('success')
							<p[c:green5]> session('success')

					<div[d:block]>
						<button[bw:1px]> "Send Reset Password Instructions"
