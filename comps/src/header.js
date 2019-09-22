import {onNavigate} from '../helpers/navigate.js'
import {intent} from '../main.js'

export let Header = function({render}) {

	intent("navigateLogin", function(e) {
		// onNavigate('/accounts/login')
		window.history.pushState({}, '/accounts/login/', window.location.origin + "/accounts/login/")
		window.location.reload()
	})
	intent("navigateHome", function(e) {
		onNavigate("/home")
	})

	let representation = () => `
	<div class="navCont">
		<nav class="navbar">
			<ul>
				<li class="navButton" onclick=navigateHome()>Home</li>
				<li class="navButton">Play</li>
				<li class="navButton">Account</li>
				<li class="navButton" onclick=navigateLogin()>Login</li>
			</ul>
		</nav>
	</div>
	`

	return representation
}

