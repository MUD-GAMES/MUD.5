import { intent } from '../main.js'
import {value} from '../main.js'

export let Form = function({render}) {
	let state = { username: "", email: "", password: "", render }

	intent("capInput", function(e) {
		state.username = value("username")
		state.email = value("email")
		state.password = value("password")
		state.render(representation())
		return false
	})

	let representation = () => `
	<div class="formCont">
		<h3>Register</h3>
		<form class="form" action="">
			<div class="userNameCont">
				<label class="regLab" for="username">Username</label>
				<input id="username" type="text" >
			</div>
			<div class="emailCont">
				<label class="regLab" for="email">Email</label>
				<input id="email" type="email">
			</div>
			<div class="passwordCont">
				<label class="reg" for="passOne">Password One</label>
				<input id="password" type="password">
			</div>
			<div class="passwordCont">
				<label class="reg" for="passTwo">Password Two</label>
				<input type="password">
			</div>
			<button class="submit" onclick=capInput()>Test</button>
		</form>
	</div>
	`

	return representation

}
