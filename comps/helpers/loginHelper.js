import axios from 'axios'

export let userData;

export let loadUser = (axios) => {
	let token = localStorage.getItem('token')
	let headers = {
		"Content-Type": "application/json"
	};
		headers["Authorization"] = `Token ${token}`
		return axios
			// .get('http://127.0.0.1:8000/api/auth/user/', {headers, })
			.get('https://mud5games.herokuapp.com//api/auth/user/', user)
			.then(res => {
				return res.data
			})
			.catch(err => {
				console.log(err)
			})

}


export const createNewUser = (axios, user) => {
	console.log(user)
	return axios
		// .post('http://127.0.0.1:8000/api/auth/register/', user)
		// .post('https://zachstestbuilddjango.herokuapp.com/api/auth/register/', user)
		.post('https://mud5games.herokuapp.com//api/auth/register/', user)
		// .post('http://localhost:8000/api/auth/register/', user)
		.then(res => {
			console.log(res.data)
			return (res.data)
		})
		.catch(err => {
			console.log(err.response)
		})
}

export const logInUser = (axios, redirect, user) => {
	console.log(user)
	return axios
		// .post('https://zachstestbuilddjango.herokuapp.com/api/auth/login/', user)
		.post('https://mud5games.herokuapp.com//api/auth/login/', user)
		// .post('http://127.0.0.1:8000/api/auth/login/', user)
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
