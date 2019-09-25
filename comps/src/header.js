import {onNavigate} from '../helpers/navigate.js'
import {intent} from '../main.js'

export let Header = function({render}) {

	intent("navigateLogin", function(e) {
		onNavigate('/login')
	})
	intent("navigateHome", function(e) {
		onNavigate("/")
	})
	intent("navigateGame", function(e) {
		onNavigate("/gametime")
	})

	let representation = () => `
	<div class="navCont">
		<nav class="navbar">
			<ul>
				<li class="navButton" onclick=navigateHome()>Home</li>
				<li class="navButton" onclick=navigateGame()>Play Game</li>
				<li class="navButton">Account</li>
				<li class="navButton" onclick=navigateLogin()>Login</li>
			</ul>
		</nav>
	</div>
	`

	return representation
}

