export const newMap = () => {
	console.log('newMap')
	let ctx = null;
	let gameMap = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
		0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
	let tileW = 40, tileH = 40;
	let mapW = 10, mapH = 10;
	let currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;

	let keysDown = {
		37 : false,
		38 : false,
		39 : false,
		40 : false
	};


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

	const drawGame = () => 	
	{
		console.log('drawGame')
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
			if(nmove && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) { player.tileTo[1]-= 1; }
			else if(smove && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1) { player.tileTo[1]+= 1; }
			else if(emove && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) { player.tileTo[0]-= 1; }
			else if(wmove && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) { player.tileTo[0]+= 1; }

			if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
			{ player.timeMoved = currentFrameTime; }
		}

		for(let y = 0; y < mapH; ++y)
		{
			for(let x = 0; x < mapW; ++x)
			{
				switch(gameMap[((y*mapW)+x)])
				{
					case 0:
						ctx.fillStyle = "#685b48";
						break;
					default:
						ctx.fillStyle = "#5aa457";
				}

				ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
			}
		}

		ctx.fillStyle = "#0000ff";
		ctx.fillRect(player.position[0], player.position[1],
			player.dimensions[0], player.dimensions[1]);

		ctx.fillStyle = "#ff0000";
		ctx.fillText("FPS: " + framesLastSecond, 10, 20);

		lastFrameTime = currentFrameTime;
		requestAnimationFrame(function() {drawGame()});
	}

}
