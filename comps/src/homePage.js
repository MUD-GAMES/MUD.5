
import {getNames, intent} from '../main.js'
import {onNavigate} from '../helpers/navigate.js'

export let Home = function({render}) {

	// let state = {theNames: [], render}
	// const names = () => {
	// 	return getNames()
	// 		.then( res => {
	// 			state.theNames = res
	// 			state.render(representation())
	// 		} )
	// }
	// names()
	intent('navigateSignup', function(e) {
		onNavigate('/signup')
	})
		
	
		let representation = () => `
			<div id="homeCont">
			This is the Home Page
			<button onclick=navigateSignup()>Sign Up To Play Now!</button>
			</div>
	` 

	// let namesList = (names) => {
	// 	if (names != []) {
	// 		return `
	// 			<ul>
	// 			${names.map(n => `<li>${n.name}</li>`)}
	// 			</ul>
	// 	`
	// 	} else {
	// 		return `<div></div>`
	// 	}
	// } 
		return representation
}

