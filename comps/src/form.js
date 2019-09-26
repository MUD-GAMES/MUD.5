import { intent } from '../main.js'
import {value} from '../main.js'
import {createNewUser, logInUser} from '../helpers/loginHelper.js'
import {onNavigate} from '../helpers/navigate.js'
import axios from 'axios'

export let SignUpForm = function({render}) {
	let state = { username: "", password: "", email: "" }

	intent("capInput", function(e) {
		state.username = value("username")
		state.email = value("email")
		state.password = value("password")
		// state.render(representation())
		createNewUser(axios, state)
		console.log(state)
		return false
	})

	

	let representation = () => `
	<div class="formCont">
		<h3>Sign UP</h3>
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
			<button class="submit" onclick=capInput()>SignUP</button>
		</div>
	</div>
	`

	return representation

}

export let LogInForm = function({render}) {
	let state = { username: "", password: ""}

	intent("capInput", function(e) {
		state.username = value("username")
		state.password = value("password")
		// state.render(representation())
		logInUser(axios, onNavigate, state)
		return false
	})


	

	let representation = () => `
	<div class="formCont">
		<h3>Log In</h3>
		<div class="form">
			<div class="userNameCont">
				<label class="regLab" for="username">Username</label>
				<input id="username" type="text" >
			</div>
			<div class="passwordCont">
				<label class="reg" for="pass">Password</label>
				<input id="password" type="password">
			</div>
			<button class="submit" onclick=capInput()>Login</button>
		</div>
	</div>
	`

	return representation

}
