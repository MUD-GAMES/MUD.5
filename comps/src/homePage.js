
// const getNames = () => {
// 	axios.get('http://127.0.0.1:8000/players')
// 		.then(res => {
// 			console.log(res.data)
// 			return res.data
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }
//
import {getNames} from '../main.js'

export let Home = function({render}) {
	let state = {theNames: [], render}
	const names = () => {
		return getNames()
			.then( res => {
				state.theNames = res
				state.render(representation())
			} )
	}
	names()
		let representation = () => `
			<div class="homeCont">
			This is the Home Page
			${namesList(state.theNames)}
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

