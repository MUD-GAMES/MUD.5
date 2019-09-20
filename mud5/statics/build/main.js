import SPARouter from "@kodnificent/sparouter"
import {Header} from './src/header.js'
import {Form} from './src/form.js'
import {Blank} from './src/blank.js'

// router creation and options
const options = {historyMode : true}
const router = new SPARouter(options)

let render = function (component, initState = {}, mountNode = 'app') {
	console.log("ran")
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

router.get('/', function(req, res) {
	render(Header)
	render(Blank, {},'main')
})
router.get('/login', function(req, res) {
	render(Header)
	render(Form, {}, "main")
})

// initialize router
router.init()

