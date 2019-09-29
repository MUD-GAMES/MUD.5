// import arrayGen from './mapArrayGen.js'
export const newMap = (state) => {
	let ctx = null;
	// let gameMap = [
	// 	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	// 	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	// 	0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
	// 	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	// 	0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
	// 	0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
	// 	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	// 	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	// 	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	// 	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	// ];


	let tileW = 40, tileH = 40;
	let mapW = 10, mapH = 10;
	let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
	let rooms = state.rooms
	const floorTypes = {
		solid: 0,
		path : 1,
		room : 2
	}

	let tileTypes = {
		0 : { colour:"#685b48", floor:floorTypes.solid	},
		1 : { colour:"#5aa457", floor:floorTypes.path	},
		2 : { colour:"#e8bd7a", floor:floorTypes.room	},
	};	

	let viewport = {
		screen		: [0,0],
		startTile	: [0,0],
		endTile		: [0,0],
		offset		: [0,0],
		update		: function(px, py) {
			this.offset[0] = Math.floor((this.screen[0]/4) - px);
			this.offset[1] = Math.floor((this.screen[1]/4) - py);

			let tile = [ Math.floor(px/tileW), Math.floor(py/tileH) ];

			this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / tileW);
			this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / tileH);

			if(this.startTile[0] < 0) { this.startTile[0] = 0; }
			if(this.startTile[1] < 0) { this.startTile[1] = 0; }

			this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / tileW);
			this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / tileH);

			if(this.endTile[0] >= mapW) { this.endTile[0] = mapW-1; }
			if(this.endTile[1] >= mapH) { this.endTile[1] = mapH-1; }
		}
	};	

	const borderGen = (x,y) => {
		const aLength = x*y	
		let aMap = [...Array(aLength)].map((_ , i) => i)
		let anotherMap = aMap.map((id, index) => {
			if (index < x || index % y === 0 || index >= (x * y) - x || index % x === x - 1) {
				return index
			}
		})	
		return anotherMap
	}

	const RandomNumGen = (x,y) => {
		const aLength = x * y
		return Math.floor(Math.random() * (aLength - 1)  + 2)
	}

	const arrayGen = (x,y) => {
		let randomIndex = []
		let values = {}
		let runtime = rooms.length
		let fborder = borderGen(x,y)
		let roomOrder = []
		let path = []

		const findpath = (start, end) => {
			let the_start = start
			while (true) {
				if (((end - the_start) / 10) >= 1 && end > start) {
						the_start += 10
					if (the_start === end) {
						break
					}
						path.push(the_start)

				} else if (((end - the_start) / 10) < 1 && end - the_start > 0 && end > start) {
					the_start += 1
					if (the_start === end) {
						break
					}
					path.push(the_start)
				} else if (((end - the_start) / 10) <= -1 && start > end) {
					the_start-=10
					if (the_start === end || end === undefined) {
						break
					}
					path.push(the_start)
				} else if (((end - the_start) / 10) > -1 &&  start > end) {
					the_start-=1
					if (the_start === end || end === undefined) {
						break
					}
					path.push(the_start)
				} 
				// if (start < end && the_start > end) {
				// 	path = []
				// 	the_start = start
				// }
				// if (start > end && the_start < end) {
				// 	path = []
				// 	the_start = start
				// }
			}
		}

		const directionLoop = (num) => {
			// const breakCheck = (prev, num) => {
			// 	const checkNumbs = []
			// 	const border = borderGen()
			// 	if ( ) {
			// 		return false
			// 	} 
			// 	return true
			// 	
			// }
			let currentRoom = rooms[1]
			let prevIndx = 11 
			roomOrder.push(currentRoom)
			for (let i = 1; i < rooms.length; i++) {
				let newNumb = RandomNumGen(x,y)
				while (fborder.includes(newNumb) || randomIndex.includes(newNumb)) {
					newNumb = RandomNumGen(x,y)
				}
				let arrayObjKeys = Object.keys(currentRoom)
				let arrayObjValues = Object.values(currentRoom)
				let arrayObjKey = arrayObjKeys.indexOf("connect")
				let arrayObjVal = arrayObjValues[arrayObjKey]
				let	newCurrentRoom = rooms.filter(r => {
					if (arrayObjVal === r.id) {
						return r
					}
				})
				currentRoom = newCurrentRoom[0]
				randomIndex.push(newNumb)
				roomOrder.push(currentRoom)
			}
		}
		let startingRoom = x + 1
		randomIndex.push(startingRoom)
		directionLoop()

		for (let x = 0; x < randomIndex.length; x++) {
			if (randomIndex[x + 1] != undefined) {
				findpath(randomIndex[x], randomIndex[x + 1])
			} 
			// randomIndex.forEach((x , i) => {
			// 	if (randomIndex[i + 1] != undefined) {
			// 		findpath(x, randomIndex[i + 1])
			// 	}
			// })
		}
		let aLength = x*y
		let aMap = [...Array(aLength)].map((_ , i) => i)
		let border = borderGen(x,y)
		let anotherMap = aMap.map((id, index) => {
			if (border.includes(index)) {
				return id = 0
			} else if ( randomIndex.includes(index)) {
					const raIndex = randomIndex.indexOf(index)
					const thereturnid = roomOrder[raIndex].id
					return id = 2

			}else if (path.includes(index)) {
				return id = 1
			} else {
				return id = 0
			} 
		})

		console.log(randomIndex)
		console.log(path)
		return anotherMap

	}

	let gameMap = arrayGen(mapW, mapH)

	class Room {
		constructor(props) {
			this.position = props.position;
			this.dimensions = props.dimensions;
			this.description = props.description;
			this.linkedRoom = props.linkedRoom;
		}
	}

	class Character {
		constructor(props) {
			this.tileFrom = props.tileFrom; 
			this.tileTo = props.tileTo;
			this.timeMoved = props.timeMoved;
			this.dimensions = props.dimensions;
			this.position = props.position;
			this.delayMove = props.delayMove;
		}

		placeAt(x,y) {
			this.tileFrom	= [x,y];
			this.tileTo		= [x,y];
			this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
				((tileH*y)+((tileH-this.dimensions[1])/2))];
		}

		canMoveTo(x,y) {
			if(x < 0 || x >= mapW || y < 0 || y >= mapH) { return false; }
			if(tileTypes[gameMap[toIndex(x,y)]].floor==floorTypes.path || tileTypes[gameMap[toIndex(x,y)]].floor==floorTypes.room) { return true; }
			return false;
		}

		canMoveUp() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1); };
		canMoveDown() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1); };
		canMoveLeft() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]); };
		canMoveRight(){ return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]); };

		moveLeft(t) { this.tileTo[0]-=1; this.timeMoved = t; };
		moveRight(t)	{ this.tileTo[0]+=1; this.timeMoved = t; };
		moveUp(t) { this.tileTo[1]-=1; this.timeMoved = t; };
		moveDown(t) { this.tileTo[1]+=1; this.timeMoved = t; };

		processMovement(t) {
			if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

			if((t-this.timeMoved)>=this.delayMove)
			{
				this.placeAt(this.tileTo[0], this.tileTo[1]);
			}
			else
			{
				this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
				this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

				if(this.tileTo[0] != this.tileFrom[0])
				{
					let diff = (tileW / this.delayMove) * (t-this.timeMoved);
					this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
				}
				if(this.tileTo[1] != this.tileFrom[1])
				{
					let diff = (tileH / this.delayMove) * (t-this.timeMoved);
					this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
				}

				this.position[0] = Math.round(this.position[0]);
				this.position[1] = Math.round(this.position[1]);
			}

			return true;

			}
	}

	let player = new Character({
		tileFrom: [1,1],
		tileTo: [1,1],
		timeMoved: 0,
		dimensions: [30,30],
		position: [45,45],
		delayMove: 700,
	});

	const toIndex = (x,y) => {
		return ((y * mapW) + x)
	}

		ctx = document.getElementById('game').getContext("2d");
		requestAnimationFrame(function() {drawGame()});
		ctx.font = "bold 10pt sans-serif";

		const north = document.getElementById("north")	
		const south = document.getElementById("south")
		const east = document.getElementById("east")
		const west = document.getElementById("west")

		let nmove = false;
		let smove = false;
		let emove = false;
		let wmove = false;

	north.addEventListener("mousedown", function(e){
		nmove = true
	})
	south.addEventListener("mousedown", function(e){
		smove = true
	})
		
	east.addEventListener("mousedown", function(e){
		emove = true
	})
	west.addEventListener("mousedown", function(e){
		wmove = true
	})
	north.addEventListener("mouseup", function(e){
		nmove = false
	})
	south.addEventListener("mouseup", function(e){
		smove = false
	})
		
	east.addEventListener("mouseup", function(e){
		emove = false
	})
	west.addEventListener("mouseup", function(e){
		wmove = false
	})

	viewport.screen = [document.getElementById('game').width,
		document.getElementById('game').height];


	const drawGame = () => 	
	{
		if(ctx==null) { return; }

		let currentFrameTime = Date.now();
		let timeElapsed = currentFrameTime - lastFrameTime;

		let sec = Math.floor(Date.now()/1000);
		if(sec!=currentSecond)
		{
			currentSecond = sec;
			framesLastSecond = frameCount;
			frameCount = 1;
		}
		else { frameCount++; }

		if(!player.processMovement(currentFrameTime))
		{
			if(nmove && player.canMoveUp()) { player.moveUp(currentFrameTime); }
			else if(smove && player.canMoveDown()) { player.moveDown(currentFrameTime); }
			else if(emove && player.canMoveLeft()) { player.moveLeft(currentFrameTime); }
			else if(wmove && player.canMoveRight()) { player.moveRight(currentFrameTime); }

		}
	viewport.update(player.position[0] + (player.dimensions[0]/2),
			player.position[1] + (player.dimensions[1]/2));

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			ctx.fillStyle = tileTypes[gameMap[toIndex(x,y)]].colour;

			ctx.fillRect( viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH),
				tileW, tileH);
		}
	}

	ctx.fillStyle = "#0000ff";
	ctx.fillRect(viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1]);

	ctx.fillStyle = "#ff0000";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);


		lastFrameTime = currentFrameTime;
		requestAnimationFrame(function() {drawGame()});
	}

}
