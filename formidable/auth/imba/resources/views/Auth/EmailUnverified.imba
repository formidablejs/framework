import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class EmailUnverified < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> "Email Unverified"

				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body[ff:Nunito m:0]>
				<h1> "Verify Account"

				<p> "Your account is not verified, please check your mailbox for the verification link"

				if session('success')
					<p[c:green5]> session('success')

				<section[d:flex g:1]>
					"Click "
					<form action=URL.route('email.resend') method="POST">
						csrf()

						<input type="hidden" name="email" value=get('user').email>

						<button[bw:0 p:0 m:0 bgc:transparent c:#069 fs:unset td:underline cursor:pointer]> "here"
					" to resend the verification link"
