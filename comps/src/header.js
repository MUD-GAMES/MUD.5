import {onNavigate} from '../helpers/navigate.js'
import {intent} from '../main.js'

export let Header = function({render}) {
	let state = { loggedIn: "", render }

	intent("navigateLogin", function(e) {
		onNavigate('/login')
	})
	intent("navigateHome", function(e) {
		onNavigate("/")
	})
	intent("navigateGame", function(e) {
		onNavigate("/gametime")
	})
	intent("logout", function(e) {
		if (state.loggedIn === true) {
			localStorage.removeItem("token")
			state.loggedIn = false
			state.render(representation())
		} else {
			state.loggedIn === false
			state.render(representation())
		}
	})
	console.log(state.loggedIn)

	let representation = () => `
	<div class="navCont">
		<nav class="navbar">
			<ul>
				<li class="navButton" onclick=navigateHome()>Home</li>
				<li class="navButton" onclick=navigateGame()>Play Game</li>
				<li class="navButton">Account</li>
				${state.loggedIn ===  true ? 
					`<li class="navButton" onclick=logout()>LogOut</li>`
						:
						`<li class="navButton" onclick=navigateLogin()>Login</li>`
				}
			</ul>
		</nav>
	</div>
	`

	return representation
}

