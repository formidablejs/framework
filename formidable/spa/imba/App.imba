import { props } from './store'
import { Home } from './pages/Home'
import { About } from './pages/About'

export tag App
	<self[ff:Nunito ta:center]>
		<nav[p:7 fs:large]>
			<a[fw:bold] route-to="/"> "Home"
			" | "
			<a[fw:bold] route-to="/about"> "About"

		<Home route="/*$">
		<About route="/about">
