import SPARouter from "@kodnificent/sparouter"
import {Header} from './src/header.js'
import {SignUpForm, LogInForm} from './src/form.js'
import {Blank} from './src/blank.js'
import {Home} from './src/homePage.js'
import {GamePage} from './src/gamePage.js'
import axios from 'axios'

// router creation and options
const options = {historyMode : true}
const router = new SPARouter(options)

let render = function (component, initState = {}, mountNode = 'app') {
  initState.render = function( stateRepresentation/* , options = {} */ ) {
    (document.getElementById(mountNode) || {}).innerHTML = stateRepresentation
  }

  let stateRepresentation = component(initState)

  initState.render((typeof stateRepresentation === 'function' ) ? stateRepresentation() : stateRepresentation)
}


// adds the function call "i" to the window object. Allows it to be called
export let intent = function(i,f) {
	window[i || "_"] = f
}

// grabs the value of said object
export let value = function(el) {
	return document.getElementById(el).value
}

export let innerHtml = function(el) {
	return document.getElementById(el).innerHTML
}

export let listItems = function(className) {
	return document.getElementsByClassName(className)
}

// export const getNames = () => {
// 	// return axios.get('https://djangoboiler.herokuapp.com/players')
// 	return axios.get('http://127.0.0.1:8000/players')
// 		.then(res => {
// 			console.log(res.data)
// 			return res.data
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }
//

router.get('/', function(req, res) {
	render(Header)
	render(Home, {},'main')
})

router.get('/signup', function(req, res) {
	render(Header)
	render(SignUpForm, {},'main')
})

router.get('/login', function(req, res) {
	render(Header)
	render(LogInForm, {}, 'main')
})

router.get('/gametime', function(req,res){
	render(Header)
	render(GamePage, {}, 'main')
})

// initialize router
router.init()


