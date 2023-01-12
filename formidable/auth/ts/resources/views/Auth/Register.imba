import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Register < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> "Login"

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<h1> "Create an Account"

				<form action=URL.route('register') method="POST">
					csrf()

					<label[d:block mb:3]>
						"Full Name"
						<input[d:block bw:1px] [bc:red5]=hasError('name') name="name" type="text" placeholder="Full Name" value=old('name') required>

						if hasError('name')
							<p[c:red5]> error for error in error('name')

					<label[d:block mb:3]>
						"Email Address"
						<input[d:block bw:1px] [bc:red5]=hasError('email') name="email" type="email" placeholder="Email Address" value=old('email') required>

						if hasError('email')
							<p[c:red5]> error for error in error('email')

					<label[d:block mb:3]>
						"Password"
						<input[d:block bw:1px] [bc:red5]=hasError('password') name="password" type="password" placeholder="Password" required>

						if hasError('password')
							<p[c:red5]> error for error in error('password')

					<label[d:block mb:3]>
						"Password Confirmation"
						<input[d:block bw:1px] [bc:red5]=hasError('password_confirmation') name="password_confirmation" type="password" placeholder="Password Confirmation" required>

						if hasError('password_confirmation')
							<p[c:red5]> error for error in error('password_confirmation')

					<a href="/forgot-password"> "Forgot your password?"

					<div[d:block]>
						<button[bw:1px]> "Create Account"
