import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class PasswordReset < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> "PasswordReset"

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<h1> "Reset Password"

				<form action=URL.route('password.reset', {}, {
					email: get('email')
					token: get('token')
					signature: get('signature')
				}) method="POST">
					csrf()

					if hasSession('success')
						<p[c:green5]> session('success')

						<section[mb:8px]>
							"Click"
							<a href="/login"> " here "
							"to login"

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

					<div[d:block]>
						<button[bw:1px]> "Reset Password"
