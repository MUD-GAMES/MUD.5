import { intent } from '../main.js'
import {value} from '../main.js'
import {createNewUser} from '../main.js'

export let Form = function({render}) {
	let state = { User_Name: "", Email: "", Password: "" }

	intent("capInput", function(e) {
		state.User_Name = value("username")
		state.Email = value("email")
		state.Password = value("password")
		// state.render(representation())
		createNewUser(state)
		return false
	})

	

	let representation = () => `
	<div class="formCont">
		<h3>Register</h3>
		<div class="form">
			<div class="userNameCont">
				<label class="regLab" for="username">Username</label>
				<input id="username" type="text" >
			</div>
			<div class="emailCont">
				<label class="regLab" for="email">Email</label>
				<input id="email" type="email">
			</div>
			<div class="passwordCont">
				<label class="reg" for="pass">Password</label>
				<input id="password" type="password">
			</div>
			<button class="submit" onclick=capInput()>Test</button>
		</div>
	</div>
	`

	return representation

}
