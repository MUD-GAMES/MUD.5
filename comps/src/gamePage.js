import { intent, value, innerHtml, listItems} from '../main.js'
import {loadUser, loadPlayers, loadRooms } from '../helpers/loginHelper.js'
import {newMap, findRoom} from '../helpers/map.js'
import axios from 'axios'

export let GamePage = function({render}) {
	// let state = { currentRoom: "", movement: "", player: "" }
	let state = { loggedIn: false, user: {},room: {}, rooms: {}, player: {}, item: "", render}

	const theLogIn = () => {
		console.log("called")
		return loadUser(axios)
			.then(res => {
				if (res.username) {
					state.loggedIn = true
					state.user = res
					// let canvas = document.getElementById("game")
					state.render(representation())
					// console.log(canvas)
					loadPlayers() 
						.then(res => {
							console.log(res)
							let newPlayer = res.filter(p => {
								console.log(p)
								if (p.the_user === state.user.id ) {
									return p
								}
								state.player = newPlayer
								console.log(newPlayer)

							})
						})
						.catch(err => {
							console.log(err)
						})
						loadRooms()
						.then(res => {
							state.rooms = res
							newMap(state)
						})
						.catch(err => {
							console.log(err)
						})
					return false
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	// const canvasfunc = (c) => {
	// 	if (c) {
	// 	  let ctx = c.getContext("2d");
	// 		ctx.beginPath();
	// 		ctx.rect(20, 20, 150, 100);
	// 		ctx.stroke();
	// 	}
	// }
			

	theLogIn()

	let descRoom = document.getElementById("name")




	let representation = () => `
	${state.loggedIn === true ? `
		<div class="gamePageCont">
			<div>
				<canvas id="game" width="500" height="500"></canvas>
			</div>
			<div class="sideViewCont">
				<div class="roomInfo">
					<div class="descCont">
						<div class="roomCont">
							<label for="">Room:</label>
							<p id="room" class="room">Test Room</p>
						</div>
						<div class="descCont">
							<label for="">Description:</label>
							<p id="desc" class="desc"></p>
						</div>
					</div>
				</div>
				<div class="playerInfo">
					<div class="gInfo">
						<div class="name">
							<label for="">Username:</label>
							<p id="name"></p>
						</div>
					</div>
				</div>
				<div class="controls">
					<div class="directions">
						<div class="dir">
							<div id="north" class="button" >N</div>
						</div>
						<div class="dir">
							<div id="east" class="button" >E</div>
							<div id="west" class="button">W</div>
						</div>
						<div class="dir">
							<div id="south" class="button">S</div>
						</div>
					</div>
				</div>
			</div>
		</div>
			`: `<div class="loginplease">Log In To Play</div>`
		}
	`

		return representation
}
