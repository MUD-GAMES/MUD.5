import { intent, value, innerHtml, listItems} from '../main.js'
import {loadUser, loadPlayers, loadRooms } from '../helpers/loginHelper.js'
import {newMap} from '../helpers/map.js'
import axios from 'axios'

export let GamePage = function({render}) {
	// let state = { currentRoom: "", movement: "", player: "" }
	let state = { loggedIn: false, user: {}, rooms: {}, player: {}, item: "", render}

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
							let newPlayer = res.filter(p => {
								if (p.the_user === state.user.id ) {
									return p
								}
								state.player = newPlayer

							})
						})
						.catch(err => {
							console.log(err)
						})
						loadRooms()
						.then(res => {
							state.rooms = res
							newMap(state)
							console.log(state)
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


	// intent("movementNorth", function(e) {
	// 	state.movement = innerHtml("north")
	// 	console.log(state.movement)
	// 	return false
	// })
	// intent("movementSouth", function(e) {
	// 	state.movement = innerHtml("south")
	// 	console.log(state.movement)
	// 	return false
	// })
	// intent("movementEast", function(e) {
	// 	state.movement = innerHtml("east")
	// 	console.log(state.movement)
	// 	return false
	// })
	// intent("movementWest", function(e) {
	// 	state.movement = innerHtml("west")
	// 	console.log(state.movement)
	// 	return false
	// })
  //
	// intent("pickUpItem", function(e) {
	// 	let items = Array.from(listItems('items'))
	// 	let checked = items.filter(i => {
	// 		return i.checked
	// 	})
	// 	state.item = checked[0].value
	// 	console.log(state.item)
	// })


	let representation = () => `
	${state.loggedIn === true ? `
		<div class="gamePageCont">
			<div>
				<canvas id="game" width="500" height="500"></canvas>
			</div>
			<div class="sideViewCont">
				<div class="roomInfo">
					<div class="descCont">
						<p class="room">Test Room</p>
						<p class="desc">This is the room info</p>
					</div>
					<div class="itemList">
						<ul>
							<li><input  class="items" id="1" type="radio", name="item" value="item1">item 1</li>
							<li><input  class="items" id="2" type="radio", name="item" value="item2">item 2</li>
							<li><input  class="items" id="3" type="radio", name="item" value=item3>item 3</li>
						</ul>
					<div class="itemControls">
						<div class="pickup" onclick=pickUpItem()>
							Pickup Item
						</div>
						<div class="drop">
							Drop Item
						</div>
					</div>
					</div>
				</div>
				<div class="playerInfo">
					<div class="gInfo">
						<div class="name">
							badCompany55
						</div>
					</div>
					<div class="item">
						<ul>
							<li>item 1</li>
						</ul>
					</div>
				</div>
				<div class="controls">
					<div class="directions">
						<div class="dir">
							<div id="north" >N</div>
						</div>
						<div class="dir">
							<div id="east" >E</div>
							<div id="west" >W</div>
						</div>
						<div class="directions">
							<div id="south" >S</div>
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
