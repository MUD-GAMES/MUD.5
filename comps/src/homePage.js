
import {getNames} from '../main.js'

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
		let representation = () => `
			<div id="homeCont">
			This is the Home Page
			</div>
	` 

	let namesList = (names) => {
		if (names != []) {
			return `
				<ul>
				${names.map(n => `<li>${n.name}</li>`)}
				</ul>
		`
		} else {
			return `<div></div>`
		}
	} 
		return representation
}

