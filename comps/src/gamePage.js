import { intent, value, innerHtml } from '../main.js'
export let GamePage = function({render}) {
	// let state = { currentRoom: "", movement: "", player: "" }
	let state = { movement: "", render}

	intent("movementNorth", function(e) {
		state.movement = innerHtml("north")
		console.log(state.movement)
		return false
	})
	intent("movementSouth", function(e) {
		state.movement = innerHtml("south")
		console.log(state.movement)
		return false
	})
	intent("movementEast", function(e) {
		state.movement = innerHtml("east")
		console.log(state.movement)
		return false
	})
	intent("movementWest", function(e) {
		state.movement = innerHtml("west")
		console.log(state.movement)
		return false
	})


	let representation = () => `
	<div class="gamePageCont">
		<div class="gameViewCont">
		</div>
		<div class="sideViewCont">
			<div class="roomInfo">
				<div class="descCont">
					<p class="room">Test Room</p>
					<p class="desc">This is the room info</p>
				</div>
				<div class="items">
					<ul>
						<li>item 1</li>
						<li>item 2</li>
						<li>item 3</li>
					</ul>
				</div>
			</div>
			<div class="playerInfo">
				<div class="gInfo">
					<div class="name">
						badCompany55
					</div>
				</div>
				<div class="items">
					<ul>
						<li>item 1</li>
					</ul>
				</div>
			</div>
			<div class="controls">
				<div class="directions">
					<div class="dir">
						<div id="north" onclick=movementNorth()>N</div>
					</div>
					<div class="dir">
						<div id="east" onclick=movementEast()>E</div>
						<div id="west" onclick=movementWest()>W</div>
					</div>
					<div class="directions">
						<div id="south" onclick=movementSouth()>S</div>
					</div>
				</div>
				<div class="itemControls">
					<div class="pickup">
						Pickup Item
					</div>
					<div class="drop">
						Drop Item
					</div>
				</div>
			</div>
		</div>
	</div>

	`

	return representation
}
