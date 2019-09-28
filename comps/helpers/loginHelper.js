import axios from 'axios'
import {onNavigate} from './navigate.js'

export let userData;

export let loadUser = () => {
	let token = localStorage.getItem('token')
	let headers = {
		"Content-Type": "application/json"
	};
		headers["Authorization"] = `Token ${token}`
		return axios
			.get('http://127.0.0.1:8000/api/auth/user/', {headers, })
			// .get('https://mud5games.herokuapp.com/api/auth/user/', {headers, })
			.then(res => {
				console.log(res.data)
				return res.data
			})
			.catch(err => {
				console.log(err)
			})

}

const loginNav = () => {
	onNavigate('/login')
}

const flashMessage = () => {
	const wait = setTimeout(loginNav, 900)
}


export const createNewUser = (axios, user) => {
	console.log(user)
	return axios
		.post('http://127.0.0.1:8000/api/auth/register/', user)
		// .post('https://zachstestbuilddjango.herokuapp.com/api/auth/register/', user)
		// .post('https://mud5games.herokuapp.com/api/auth/register/', user)
		.then(res => {
			let message = document.getElementById('successMessage')
			if (res.status === 200) {
				message.innerHTML = "New User Created Successfully"
				flashMessage()
			} else {
				message.innerHTML = "There was a problem creating the User"
			}
			}
		)
		.catch(err => {
			let message = document.getElementById('failureMessage')
			if (!user.username || !user.email || !user.password) {
				message.innerHTML = "USERNAME, EMAIL, PASSWORD are required"
			} else if (err.toJSON().message === "Request failed with status code 400") {
				let usernameMess = document.createElement("DIV") 
				let emailMess = document.createElement("DIV")
				let space = document.createElement("DIV")
				usernameMess.innerHTML = "The username is already taken"
				emailMess.innerHTML = "Please enter a valid email"
				space.style.height = '1rem'
				message.appendChild(usernameMess)
				message.appendChild(emailMess)
				message.appendChild(space)
			} else {
				message.innerHTML = "There was an internal error when creating the user"
			}
		})
}

export const logInUser = (axios, redirect, user) => {
	console.log(user)
	return axios
		// .post('https://zachstestbuilddjango.herokuapp.com/api/auth/login/', user)
		// .post('https://mud5games.herokuapp.com/api/auth/login/', user)
		.post('http://127.0.0.1:8000/api/auth/login/', user)
		.then(res => {
			window.localStorage.setItem("token", res.data.token)
			window.localStorage.setItem("username", res.data.user.username)
			window.localStorage.setItem("id", res.data.user.id)
			redirect('/gametime')
			console.log(res.data)
			return (res.data)
		})
		.catch(err => {
			console.log(err)
		})
}
