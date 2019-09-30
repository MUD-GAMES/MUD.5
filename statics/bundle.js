(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logInUser = exports.createNewUser = exports.loadRooms = exports.loadPlayers = exports.loadUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _navigate = require("./navigate.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadUser = function loadUser() {
  var token = localStorage.getItem('token');
  var headers = {
    "Content-Type": "application/json"
  };
  headers["Authorization"] = "Token ".concat(token);
  return _axios["default"].get('http://127.0.0.1:8000/api/auth/user/', {
    headers: headers
  }) // .get('https://mud5games.herokuapp.com/api/auth/user/', {headers, })
  .then(function (res) {
    return res.data;
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.loadUser = loadUser;

var loadPlayers = function loadPlayers() {
  return _axios["default"].get('http://127.0.0.1:8000/api/auth/player/') // .get('https://mud5games.herokuapp.com/api/auth/player/')
  .then(function (res) {
    return res.data;
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.loadPlayers = loadPlayers;

var loadRooms = function loadRooms() {
  return _axios["default"].get('http://127.0.0.1:8000/api/auth/rooms/') // .get('https://mud5games.herokuapp.com/api/auth/rooms/')
  .then(function (res) {
    console.log(res);
    return res.data;
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.loadRooms = loadRooms;

var loginNav = function loginNav() {
  (0, _navigate.onNavigate)('/login');
};

var flashMessage = function flashMessage() {
  var wait = setTimeout(loginNav, 900);
};

var createNewUser = function createNewUser(axios, user) {
  console.log(user);
  return axios.post('http://127.0.0.1:8000/api/auth/register/', user) // .post('https://zachstestbuilddjango.herokuapp.com/api/auth/register/', user)
  // .post('https://mud5games.herokuapp.com/api/auth/register/', user)
  .then(function (res) {
    var message = document.getElementById('successMessage');

    if (res.status === 200) {
      message.innerHTML = "New User Created Successfully";
      flashMessage();
    } else {
      message.innerHTML = "There was a problem creating the User";
    }
  })["catch"](function (err) {
    var message = document.getElementById('failureMessage');

    if (!user.username || !user.email || !user.password) {
      message.innerHTML = "USERNAME, EMAIL, PASSWORD are required";
    } else if (err.toJSON().message === "Request failed with status code 400") {
      var usernameMess = document.createElement("DIV");
      var emailMess = document.createElement("DIV");
      var space = document.createElement("DIV");
      usernameMess.innerHTML = "The username is already taken";
      emailMess.innerHTML = "Please enter a valid email";
      space.style.height = '1rem';
      message.appendChild(usernameMess);
      message.appendChild(emailMess);
      message.appendChild(space);
    } else {
      message.innerHTML = "There was an internal error when creating the user";
    }
  });
};

exports.createNewUser = createNewUser;

var logInUser = function logInUser(axios, redirect, user) {
  console.log(user);
  return axios // .post('https://zachstestbuilddjango.herokuapp.com/api/auth/login/', user)
  // .post('https://mud5games.herokuapp.com/api/auth/login/', user)
  .post('http://127.0.0.1:8000/api/auth/login/', user).then(function (res) {
    window.localStorage.setItem("token", res.data.token);
    window.localStorage.setItem("username", res.data.user.username);
    window.localStorage.setItem("id", res.data.user.id);
    redirect('/gametime');
    window.location.reload();
    console.log(res.data);
    return res.data;
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.logInUser = logInUser;

},{"./navigate.js":3,"axios":11}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newMap = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// import arrayGen from './mapArrayGen.js'
var newMap = function newMap(state) {
  var ctx = null; // let gameMap = [
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
  //

  var tileW = 40,
      tileH = 40;
  var mapW = 10,
      mapH = 200;
  var currentSecond = 0,
      frameCount = 0,
      framesLastSecond = 0,
      lastFrameTime = 0;
  var rooms = state.rooms;
  var currentIndex = 11;
  var realRooms = {};
  var floorTypes = {
    solid: 0,
    path: 1,
    room: 2
  };
  var roomName = document.getElementById("room");
  var desc = document.getElementById("desc");
  var name = document.getElementById("name");
  roomName.innerHTML = state.rooms[0].Room_Name;
  name.innerHTML = state.user.username;
  desc.innerHTML = state.rooms[0].Description;

  var findRoom = function findRoom(move) {
    if (realRooms[currentIndex]) {
      roomName.innerHTML = realRooms[currentIndex].Room_Name;
      desc.innerHTML = realRooms[currentIndex].Description;
      console.log(realRooms[currentIndex]);
      return false;
    } else {
      roomName.innerHTML = "Path";
      desc.innerHTML = "Walking on path to another room";
      return false;
    }
  };

  var tileTypes = {
    0: {
      colour: "#685b48",
      floor: floorTypes.solid
    },
    1: {
      colour: "#5aa457",
      floor: floorTypes.path
    },
    2: {
      colour: "#e8bd7a",
      floor: floorTypes.room
    }
  };
  var viewport = {
    screen: [0, 0],
    startTile: [0, 0],
    endTile: [0, 0],
    offset: [0, 0],
    update: function update(px, py) {
      this.offset[0] = Math.floor(this.screen[0] / 4 - px);
      this.offset[1] = Math.floor(this.screen[1] / 4 - py);
      var tile = [Math.floor(px / tileW), Math.floor(py / tileH)];
      this.startTile[0] = tile[0] - 1 - Math.ceil(this.screen[0] / 2 / tileW);
      this.startTile[1] = tile[1] - 1 - Math.ceil(this.screen[1] / 2 / tileH);

      if (this.startTile[0] < 0) {
        this.startTile[0] = 0;
      }

      if (this.startTile[1] < 0) {
        this.startTile[1] = 0;
      }

      this.endTile[0] = tile[0] + 1 + Math.ceil(this.screen[0] / 2 / tileW);
      this.endTile[1] = tile[1] + 1 + Math.ceil(this.screen[1] / 2 / tileH);

      if (this.endTile[0] >= mapW) {
        this.endTile[0] = mapW - 1;
      }

      if (this.endTile[1] >= mapH) {
        this.endTile[1] = mapH - 1;
      }
    }
  };

  var borderGen = function borderGen(x, y) {
    var aLength = x * y;

    var aMap = _toConsumableArray(Array(aLength)).map(function (_, i) {
      return i;
    });

    var anotherMap = aMap.map(function (id, index) {
      if (index < x || index % y === 0 || index >= x * y - x || index % x === x - 1) {
        return index;
      }
    });
    return anotherMap;
  };

  var RandomNumGen = function RandomNumGen(x, y) {
    var aLength = x * y;
    return Math.floor(Math.random() * (aLength - 1) + 2);
  };

  var randomIndex = [];

  var arrayGen = function arrayGen(x, y) {
    var values = {};
    var runtime = rooms.length;
    var fborder = borderGen(x, y);
    var roomOrder = [];
    var path = [];

    var findpath = function findpath(start, end) {
      var the_start = start;

      while (true) {
        if ((end - the_start) / 10 >= 1 && end > start) {
          the_start += 10;

          if (the_start === end) {
            break;
          }

          path.push(the_start);
        } else if ((end - the_start) / 10 < 1 && end - the_start > 0 && end > start) {
          the_start += 1;

          if (the_start === end) {
            break;
          }

          path.push(the_start);
        } else if ((end - the_start) / 10 <= -1 && start > end) {
          the_start -= 10;

          if (the_start === end || end === undefined) {
            break;
          }

          path.push(the_start);
        } else if ((end - the_start) / 10 > -1 && start > end) {
          the_start -= 1;

          if (the_start === end || end === undefined) {
            break;
          }

          path.push(the_start);
        } // if (start < end && the_start > end) {
        // 	path = []
        // 	the_start = start
        // }
        // if (start > end && the_start < end) {
        // 	path = []
        // 	the_start = start
        // }

      }
    };

    var directionLoop = function directionLoop(num) {
      // const breakCheck = (prev, num) => {
      // 	const checkNumbs = []
      // 	const border = borderGen()
      // 	if ( ) {
      // 		return false
      // 	} 
      // 	return true
      // 	
      // }
      var currentRoom = rooms[1];
      var prevIndx = 11;
      roomOrder.push(currentRoom);
      realRooms[11] = currentRoom;
      var startingRoom = x + 1;
      randomIndex.push(startingRoom);

      var _loop = function _loop(i) {
        var newNumb = RandomNumGen(x, y);

        while (fborder.includes(newNumb) || randomIndex.includes(newNumb)) {
          newNumb = RandomNumGen(x, y);
        } // } else {
        // 	prevIndx = newNumb
        // }


        var arrayObjKeys = Object.keys(currentRoom);
        var arrayObjValues = Object.values(currentRoom);
        var arrayObjKey = arrayObjKeys.indexOf("connect");
        var arrayObjVal = arrayObjValues[arrayObjKey];
        var newCurrentRoom = rooms.filter(function (r) {
          if (arrayObjVal === r.id) {
            return r;
          }
        });
        currentRoom = newCurrentRoom[0];
        randomIndex.push(newNumb);
        roomOrder.push(currentRoom);
        realRooms[newNumb] = newCurrentRoom[0];
      };

      for (var i = 1; i < rooms.length; i++) {
        _loop(i);
      }
    };

    directionLoop();
    console.log(realRooms);

    for (var _x = 0; _x < randomIndex.length; _x++) {
      if (randomIndex[_x + 1] != undefined) {
        findpath(randomIndex[_x], randomIndex[_x + 1]);
      } // randomIndex.forEach((x , i) => {
      // 	if (randomIndex[i + 1] != undefined) {
      // 		findpath(x, randomIndex[i + 1])
      // 	}
      // })

    }

    var aLength = x * y;

    var aMap = _toConsumableArray(Array(aLength)).map(function (_, i) {
      return i;
    });

    var border = borderGen(x, y);
    var anotherMap = aMap.map(function (id, index) {
      if (border.includes.index) {
        return id = 0;
      } else if (realRooms[index]) {
        // const raIndex = randomIndex.indexOf(index)
        // const thereturnid = roomOrder[raIndex].id
        // console.log(thereturnid)
        return id = 2;
      } else if (path.includes(index)) {
        return id = 1; // } else if (border.includes(index)) {
        // 	return id = 0
      } else {
        return id = 0;
      }
    });
    return anotherMap;
  };

  var gameMap = arrayGen(mapW, mapH);

  var Room = function Room(props) {
    _classCallCheck(this, Room);

    this.position = props.position;
    this.dimensions = props.dimensions;
    this.description = props.description;
    this.linkedRoom = props.linkedRoom;
  };

  var Character =
  /*#__PURE__*/
  function () {
    function Character(props) {
      _classCallCheck(this, Character);

      this.tileFrom = props.tileFrom;
      this.tileTo = props.tileTo;
      this.timeMoved = props.timeMoved;
      this.dimensions = props.dimensions;
      this.position = props.position;
      this.delayMove = props.delayMove;
    }

    _createClass(Character, [{
      key: "placeAt",
      value: function placeAt(x, y) {
        this.tileFrom = [x, y];
        this.tileTo = [x, y];
        this.position = [tileW * x + (tileW - this.dimensions[0]) / 2, tileH * y + (tileH - this.dimensions[1]) / 2];
      }
    }, {
      key: "canMoveTo",
      value: function canMoveTo(x, y) {
        if (x < 0 || x >= mapW || y < 0 || y >= mapH) {
          return false;
        }

        if (tileTypes[gameMap[toIndex(x, y)]].floor == floorTypes.path || tileTypes[gameMap[toIndex(x, y)]].floor == floorTypes.room) {
          return true;
        }

        return false;
      }
    }, {
      key: "canMoveUp",
      value: function canMoveUp() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
      }
    }, {
      key: "canMoveDown",
      value: function canMoveDown() {
        return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
      }
    }, {
      key: "canMoveLeft",
      value: function canMoveLeft() {
        return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
      }
    }, {
      key: "canMoveRight",
      value: function canMoveRight() {
        return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
      }
    }, {
      key: "moveLeft",
      value: function moveLeft(t) {
        this.tileTo[0] -= 1;
        this.timeMoved = t;
      }
    }, {
      key: "moveRight",
      value: function moveRight(t) {
        this.tileTo[0] += 1;
        this.timeMoved = t;
      }
    }, {
      key: "moveUp",
      value: function moveUp(t) {
        this.tileTo[1] -= 1;
        this.timeMoved = t;
      }
    }, {
      key: "moveDown",
      value: function moveDown(t) {
        this.tileTo[1] += 1;
        this.timeMoved = t;
      }
    }, {
      key: "processMovement",
      value: function processMovement(t) {
        if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
          return false;
        }

        if (t - this.timeMoved >= this.delayMove) {
          this.placeAt(this.tileTo[0], this.tileTo[1]);
        } else {
          this.position[0] = this.tileFrom[0] * tileW + (tileW - this.dimensions[0]) / 2;
          this.position[1] = this.tileFrom[1] * tileH + (tileH - this.dimensions[1]) / 2;

          if (this.tileTo[0] != this.tileFrom[0]) {
            var diff = tileW / this.delayMove * (t - this.timeMoved);
            this.position[0] += this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff;
          }

          if (this.tileTo[1] != this.tileFrom[1]) {
            var _diff = tileH / this.delayMove * (t - this.timeMoved);

            this.position[1] += this.tileTo[1] < this.tileFrom[1] ? 0 - _diff : _diff;
          }

          this.position[0] = Math.round(this.position[0]);
          this.position[1] = Math.round(this.position[1]);
        }

        return true;
      }
    }]);

    return Character;
  }();

  var player = new Character({
    tileFrom: [1, 1],
    tileTo: [1, 1],
    timeMoved: 0,
    dimensions: [10, 10],
    position: [55, 55],
    delayMove: 150
  });

  var toIndex = function toIndex(x, y) {
    return y * mapW + x;
  };

  ctx = document.getElementById('game').getContext("2d");
  requestAnimationFrame(function () {
    drawGame();
  });
  ctx.font = "bold 10pt sans-serif";
  var north = document.getElementById("north");
  var south = document.getElementById("south");
  var east = document.getElementById("east");
  var west = document.getElementById("west");
  var nmove = false;
  var smove = false;
  var emove = false;
  var wmove = false;
  north.addEventListener("mousedown", function (e) {
    if (player.canMoveUp()) {
      nmove = true;
      currentIndex -= 10;
    }
  });
  south.addEventListener("mousedown", function (e) {
    smove = true;

    if (player.canMoveDown()) {
      currentIndex += 10;
    }
  });
  east.addEventListener("mousedown", function (e) {
    emove = true;

    if (player.canMoveLeft()) {
      currentIndex -= 1;
    }
  });
  west.addEventListener("mousedown", function (e) {
    wmove = true;

    if (player.canMoveRight()) {
      currentIndex += 1;
    }
  });
  north.addEventListener("mouseup", function (e) {
    nmove = findRoom();
  });
  south.addEventListener("mouseup", function (e) {
    smove = findRoom();
  });
  east.addEventListener("mouseup", function (e) {
    emove = findRoom();
  });
  west.addEventListener("mouseup", function (e) {
    wmove = findRoom();
  });
  viewport.screen = [document.getElementById('game').width, document.getElementById('game').height];

  var drawGame = function drawGame() {
    if (ctx == null) {
      return;
    }

    var currentFrameTime = Date.now();
    var timeElapsed = currentFrameTime - lastFrameTime;
    var sec = Math.floor(Date.now() / 1000);

    if (sec != currentSecond) {
      currentSecond = sec;
      framesLastSecond = frameCount;
      frameCount = 1;
    } else {
      frameCount++;
    }

    if (!player.processMovement(currentFrameTime)) {
      if (nmove && player.canMoveUp()) {
        player.moveUp(currentFrameTime);
      } else if (smove && player.canMoveDown()) {
        player.moveDown(currentFrameTime);
      } else if (emove && player.canMoveLeft()) {
        player.moveLeft(currentFrameTime);
      } else if (wmove && player.canMoveRight()) {
        player.moveRight(currentFrameTime);
      }
    }

    viewport.update(player.position[0] + player.dimensions[0] / 2, player.position[1] + player.dimensions[1] / 2);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

    for (var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y) {
      for (var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x) {
        ctx.fillStyle = tileTypes[gameMap[toIndex(x, y)]].colour;
        ctx.fillRect(viewport.offset[0] + x * tileW, viewport.offset[1] + y * tileH, tileW, tileH);
      }
    }

    ctx.fillStyle = "#0000ff";
    ctx.fillRect(viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1], player.dimensions[0], player.dimensions[1]);
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
    lastFrameTime = currentFrameTime;
    requestAnimationFrame(function () {
      drawGame();
    });
  };
};

exports.newMap = newMap;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onNavigate = void 0;

var onNavigate = function onNavigate(path) {
  window.history.pushState({}, path, window.location.origin + path);
  window.history.pushState({}, path, window.location.origin + path);
  window.history.forward();
  window.history.back();
  window.history.forward();
};

exports.onNavigate = onNavigate;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItems = exports.innerHtml = exports.value = exports.intent = void 0;

var _sparouter = _interopRequireDefault(require("@kodnificent/sparouter"));

var _header = require("./src/header.js");

var _form = require("./src/form.js");

var _blank = require("./src/blank.js");

var _homePage = require("./src/homePage.js");

var _gamePage = require("./src/gamePage.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// router creation and options
var options = {
  historyMode: true
};
var router = new _sparouter["default"](options);

var render = function render(component) {
  var initState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mountNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'app';

  initState.render = function (stateRepresentation
  /* , options = {} */
  ) {
    (document.getElementById(mountNode) || {}).innerHTML = stateRepresentation;
  };

  var stateRepresentation = component(initState);
  initState.render(typeof stateRepresentation === 'function' ? stateRepresentation() : stateRepresentation);
}; // adds the function call "i" to the window object. Allows it to be called


var intent = function intent(i, f) {
  window[i || "_"] = f;
}; // grabs the value of said object


exports.intent = intent;

var value = function value(el) {
  return document.getElementById(el).value;
};

exports.value = value;

var innerHtml = function innerHtml(el) {
  return document.getElementById(el).innerHTML;
};

exports.innerHtml = innerHtml;

var listItems = function listItems(className) {
  return document.getElementsByClassName(className);
};

exports.listItems = listItems;
var loggedIn = window.localStorage.getItem("token"); // export const getNames = () => {
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

router.get('/', function (req, res) {
  render(_header.Header, {
    loggedIn: loggedIn
  });
  render(_homePage.Home, {}, 'main');
});
router.get('/signup', function (req, res) {
  render(_header.Header, {
    loggedIn: loggedIn
  });
  render(_form.SignUpForm, {}, 'main');
});
router.get('/login', function (req, res) {
  render(_header.Header, {
    loggedIn: loggedIn
  });
  render(_form.LogInForm, {}, 'main');
});
router.get('/gametime', function (req, res) {
  render(_header.Header, {
    loggedIn: loggedIn
  });
  render(_gamePage.GamePage, {}, 'main');
}); // initialize router

router.init();

},{"./src/blank.js":5,"./src/form.js":6,"./src/gamePage.js":7,"./src/header.js":8,"./src/homePage.js":9,"@kodnificent/sparouter":10,"axios":11}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blank = void 0;

var Blank = function Blank(_ref) {
  var render = _ref.render;
  var representation = "\n\t<div class=\"blank\"></div>\n\t";
  return representation;
};

exports.Blank = Blank;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogInForm = exports.SignUpForm = void 0;

var _main = require("../main.js");

var _loginHelper = require("../helpers/loginHelper.js");

var _navigate = require("../helpers/navigate.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SignUpForm = function SignUpForm(_ref) {
  var render = _ref.render;
  var state = {};
  (0, _main.intent)("capInput", function (e) {
    state.username = (0, _main.value)("username");
    state.email = (0, _main.value)("email");
    state.password = (0, _main.value)("password"); // state.render(representation())

    (0, _loginHelper.createNewUser)(_axios["default"], state);
    return false;
  });

  var representation = function representation() {
    return "\n\t<div class=\"formCont\">\n\t\t<h3>Sign UP</h3>\n\t\t<div class=\"form\">\n\t\t\t<div class=\"userNameCont\">\n\t\t\t\t<label class=\"regLab\" for=\"username\" required>Username</label>\n\t\t\t\t<input id=\"username\" type=\"text\" >\n\t\t\t</div>\n\t\t\t<div class=\"emailCont\">\n\t\t\t\t<label class=\"regLab\" for=\"email\" required>Email</label>\n\t\t\t\t<input id=\"email\" type=\"email\">\n\t\t\t</div>\n\t\t\t<div class=\"passwordCont\">\n\t\t\t\t<label class=\"reg\" for=\"pass\"required>Password</label>\n\t\t\t\t<input id=\"password\" type=\"password\">\n\t\t\t</div>\n\t\t\t<button class=\"submit\" onclick=capInput()>SignUP</button>\n\t\t\t<div id=\"successMessage\"></div>\n\t\t\t<div id=\"failureMessage\"></div>\n\t\t</div>\n\t</div>\n\t";
  };

  return representation;
};

exports.SignUpForm = SignUpForm;

var LogInForm = function LogInForm(_ref2) {
  var render = _ref2.render;
  var state = {
    username: "",
    password: ""
  };
  (0, _main.intent)("capInput", function (e) {
    state.username = (0, _main.value)("username");
    state.password = (0, _main.value)("password"); // state.render(representation())

    (0, _loginHelper.logInUser)(_axios["default"], _navigate.onNavigate, state);
    return false;
  });

  var representation = function representation() {
    return "\n\t<div class=\"formCont\">\n\t\t<h3>Log In</h3>\n\t\t<div class=\"form\">\n\t\t\t<div class=\"userNameCont\">\n\t\t\t\t<label class=\"regLab\" for=\"username\">Username</label>\n\t\t\t\t<input id=\"username\" type=\"text\" >\n\t\t\t</div>\n\t\t\t<div class=\"passwordCont\">\n\t\t\t\t<label class=\"reg\" for=\"pass\">Password</label>\n\t\t\t\t<input id=\"password\" type=\"password\">\n\t\t\t</div>\n\t\t\t<button class=\"submit\" onclick=capInput()>Login</button>\n\t\t</div>\n\t</div>\n\t";
  };

  return representation;
};

exports.LogInForm = LogInForm;

},{"../helpers/loginHelper.js":1,"../helpers/navigate.js":3,"../main.js":4,"axios":11}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePage = void 0;

var _main = require("../main.js");

var _loginHelper = require("../helpers/loginHelper.js");

var _map = require("../helpers/map.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GamePage = function GamePage(_ref) {
  var render = _ref.render;
  // let state = { currentRoom: "", movement: "", player: "" }
  var state = {
    loggedIn: false,
    user: {},
    room: {},
    rooms: {},
    player: {},
    item: "",
    render: render
  };

  var theLogIn = function theLogIn() {
    console.log("called");
    return (0, _loginHelper.loadUser)(_axios["default"]).then(function (res) {
      if (res.username) {
        state.loggedIn = true;
        state.user = res; // let canvas = document.getElementById("game")

        state.render(representation()); // console.log(canvas)

        (0, _loginHelper.loadPlayers)().then(function (res) {
          console.log(res);
          var newPlayer = res.filter(function (p) {
            console.log(p);

            if (p.the_user === state.user.id) {
              return p;
            }

            state.player = newPlayer;
            console.log(newPlayer);
          });
        })["catch"](function (err) {
          console.log(err);
        });
        (0, _loginHelper.loadRooms)().then(function (res) {
          state.rooms = res;
          (0, _map.newMap)(state);
        })["catch"](function (err) {
          console.log(err);
        });
        return false;
      }
    })["catch"](function (err) {
      console.log(err);
    });
  }; // const canvasfunc = (c) => {
  // 	if (c) {
  // 	  let ctx = c.getContext("2d");
  // 		ctx.beginPath();
  // 		ctx.rect(20, 20, 150, 100);
  // 		ctx.stroke();
  // 	}
  // }


  theLogIn();
  var descRoom = document.getElementById("name");

  var representation = function representation() {
    return "\n\t".concat(state.loggedIn === true ? "\n\t\t<div class=\"gamePageCont\">\n\t\t\t<div>\n\t\t\t\t<canvas id=\"game\" width=\"500\" height=\"500\"></canvas>\n\t\t\t</div>\n\t\t\t<div class=\"sideViewCont\">\n\t\t\t\t<div class=\"roomInfo\">\n\t\t\t\t\t<div class=\"descCont\">\n\t\t\t\t\t\t<div class=\"roomCont\">\n\t\t\t\t\t\t\t<label for=\"\">Room:</label>\n\t\t\t\t\t\t\t<p id=\"room\" class=\"room\">Test Room</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"descCont\">\n\t\t\t\t\t\t\t<label for=\"\">Description:</label>\n\t\t\t\t\t\t\t<p id=\"desc\" class=\"desc\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"playerInfo\">\n\t\t\t\t\t<div class=\"gInfo\">\n\t\t\t\t\t\t<div class=\"name\">\n\t\t\t\t\t\t\t<label for=\"\">Username:</label>\n\t\t\t\t\t\t\t<p id=\"name\"></p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"controls\">\n\t\t\t\t\t<div class=\"directions\">\n\t\t\t\t\t\t<div class=\"dir\">\n\t\t\t\t\t\t\t<div id=\"north\" class=\"button\" >N</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"dir\">\n\t\t\t\t\t\t\t<div id=\"east\" class=\"button\" >E</div>\n\t\t\t\t\t\t\t<div id=\"west\" class=\"button\">W</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"dir\">\n\t\t\t\t\t\t\t<div id=\"south\" class=\"button\">S</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t\t" : "<div class=\"loginplease\">Log In To Play</div>", "\n\t");
  };

  return representation;
};

exports.GamePage = GamePage;

},{"../helpers/loginHelper.js":1,"../helpers/map.js":2,"../main.js":4,"axios":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _navigate = require("../helpers/navigate.js");

var _main = require("../main.js");

var Header = function Header(_ref) {
  var loggedIn = _ref.loggedIn,
      render = _ref.render;
  var state = {
    loggedIn: loggedIn,
    render: render
  };
  (0, _main.intent)("navigateLogin", function (e) {
    (0, _navigate.onNavigate)('/login');
  });
  (0, _main.intent)("navigateHome", function (e) {
    (0, _navigate.onNavigate)("/");
    window.location.reload();
  });
  (0, _main.intent)("navigateGame", function (e) {
    (0, _navigate.onNavigate)("/gametime");
    window.location.reload();
  });
  (0, _main.intent)("logout", function (e) {
    if (state.loggedIn) {
      localStorage.removeItem("token");
      state.loggedIn = false;
      (0, _navigate.onNavigate)('/');
      window.location.reload();
      state.render(representation());
    } else {
      state.render(representation());
    }
  });
  console.log(state.loggedIn);

  var representation = function representation() {
    return "\n\t<div class=\"navCont\">\n\t\t<nav class=\"navbar\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"navButton\" onclick=navigateHome()>Home</li>\n\t\t\t\t<li class=\"navButton\" onclick=navigateGame()>Play Game</li>\n\t\t\t\t<li class=\"navButton\">Account</li>\n\t\t\t\t".concat(state.loggedIn ? "<li class=\"navButton\" onclick=logout()>LogOut</li>" : "<li class=\"navButton\" onclick=navigateLogin()>Login</li>", "\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n\t");
  };

  return representation;
};

exports.Header = Header;

},{"../helpers/navigate.js":3,"../main.js":4}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;

var _main = require("../main.js");

var _navigate = require("../helpers/navigate.js");

var Home = function Home(_ref) {
  var render = _ref.render,
      newMaze = _ref.newMaze;
  // let state = {theNames: [], render}
  // const names = () => {
  // 	return getNames()
  // 		.then( res => {
  // 			state.theNames = res
  // 			state.render(representation())
  // 		} )
  // }
  // names()
  (0, _main.intent)('navigateSignup', function (e) {
    (0, _navigate.onNavigate)('/signup');
  });

  var representation = function representation() {
    return "\n\t\t\t<div id=\"homeCont\">\n\t\t\tThis is the Home Page\n\t\t\t<button onclick=navigateSignup()>Sign Up To Play Now!</button>\n\t\t\t</div>\n\t";
  }; // let namesList = (names) => {
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


  return representation;
};

exports.Home = Home;

},{"../helpers/navigate.js":3,"../main.js":4}],10:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SPARouter"] = factory();
	else
		root["SPARouter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sparouter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sparouter.js":
/*!**************************!*\
  !*** ./src/sparouter.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var SPARouter =
/*#__PURE__*/
function () {
  /**
  * Instantiates the SPARouter Class.
  * @constructor
  * @param {Object} options
  * @param {boolean} [options.caseInsensitive=true] - if set to false, uri matching will be case sensitive.
  * @param {boolean} [options.historyMode=false] - Set to true if your application uses HTML History Mode Api.  
  * If set to historyMode, SPARouter will handle popstate events by initializing the router again to update the page
  * according to the callback function set with ``SPARouter.get()`` method.
  * @example
  * const router = new SPARouter({
  * historyMode: true,
  * caseInsensitive: false
  * });
  */
  function SPARouter(options) {
    _classCallCheck(this, SPARouter);

    this.routes = [];
    this.path = this._requestPath(); //default options

    var defOptions = {
      caseInsensitive: true,
      historyMode: false
    };

    var mergedOptions = _objectSpread({}, defOptions, options);

    for (var key in mergedOptions) {
      this["_".concat(key)] = mergedOptions[key];
    }

    this._checkHistoryMode();

    this.query = new _utils_js__WEBPACK_IMPORTED_MODULE_0__["QueryParams"](null, this._historyMode);
    return this;
  }
  /**
   * The get method is used in assigning routes to your application
   * @method
   * @param {string} uri route to be matched
   * @param {callback} callback a callback function to be invoked if the route has been matched.
   * @param {object} [thisArg=undefined] an argument that represents ``this`` keyword in your callback function. If empty, you will get undefined
   * if you try to use ``this`` keyword in your callback function.  
   * You can't pass the SPARouter class as ``this`` argument as it will return undefined also. The SPARouter class is already provided in the callback function
   * @example
   * // using a callback function
   * SPARouter.get("/some-page-name", (req, router)=>{
   *      console.log(this.argument); // outputs "A stored argument from my callback function" to the console
   *      console.log(req.url); // outputs "/some-page-name" to the console
   * }, {argument: "A stored argument from my callback function"}); // this ouputs "a stored argument from my callback function" to the console.
   * 
   * // using a class method
   * class SomeClass {
   *      constructor(){
   *          this.argument = "A stored argument from my class";
   *      }
   *      pageFunction(req, router){
   *          console.log(this.argument); // outputs "A stored argument from my class" to the console
   *          console.log(req.url); // outputs "/some-page-name" to the console
   *      }
   * }
   * myClass = new SomeClass();
   * SPARouter.get("/some-page-name", myClass.pageFunc, myClass);
   */

  /**
   * Callback function passed in the ```SPARouter.get()``` method.
   * @callback callback
   * @param {request} request
   * @param {router} router
   */


  _createClass(SPARouter, [{
    key: "get",
    value: function get(uri, callback, thisArg) {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(uri)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("uri");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(callback)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("callback");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(uri)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("uri", "string", uri);
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isFunction(callback)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("callback", "function", callback);
      thisArg = thisArg instanceof SPARouter ? undefined : thisArg;
      var route = {
        uri: null,
        callback: null,
        thisArg: thisArg,
        parameters: null,
        regExp: null,
        name: null,
        current: false
      };

      if (this._caseInsensitive) {
        uri = uri.toLowerCase();
      }

      ;
      uri = uri.startsWith("/") ? uri : "/".concat(uri);
      this.routes.forEach(function (route) {
        if (route.uri === uri) throw new Error("Conflicting routes. The route uri ".concat(route.uri, " already exists"));
      });
      route.uri = uri;
      route.callback = callback;
      route.parameters = this._proccessParameters(route.uri);
      this.routes.push(route);
      return this;
    }
    /**
     * @method
     * Match the uri route where a parameter name matches a regular expression. This method must be chained to the
     * ``SPARouter.get()`` method.
     * @param {string} name parameter name to match
     * @param {string} regExp regular expression pattern but must be in string format, without front slashes that converts
     * it to a regExp object. E.g "0-9", "[A-Z]". See example below  
     * Special characters which you wish to escape with the backslash must be double escaped. E.g "\\\w" instead of "\w";
     * @example
     * router.get("/{page-name}/{id}",function(req, router){
     * //do something with this route
     * 
     * 
     * }).where("page-name","user").where("id","[0-9]+");
     * //this route will match my-site.com/user/10, my-site.com/user/15
     * // it won't match my-site.com/admin/10, my-site.com/user/login
     */

  }, {
    key: "where",
    value: function where(name, regExp) {
      //validate type
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("name");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(regExp)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("regExp");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("name", "string", name);
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(regExp)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("regExp", "string", regExp);
      var route = this.routes[this.routes.length - 1]; // the target route
      //if paramaters exists for this route

      if (route.parameters.length === 0) throw new Error("No Parameters Found: Could not set paramater regExpression for [".concat(route.uri, "] because the route has no parameters"));
      regExp = regExp.replace(/\(/g, "\\(");
      regExp = regExp.replace(/\)/g, "\\)");
      regExp = "(".concat(regExp, "+)");
      var parameterFound = false;
      route.parameters.forEach(function (parameter, index) {
        if (parameter[name] !== undefined) {
          parameterFound = true;
          parameter[name].regExp = regExp;
        }
      });
      if (!parameterFound) throw new Error("Invalid Parameter: Could not set paramater regExpression for [".concat(route.uri, "] because the parameter [").concat(name, "] does not exist"));
      return this;
    }
    /**
     * SPARouter supports named routes. This methods sets the name of a route and can be referrenced using the
     * `router.pathFor(name)` inside your callback function in `SPARouter.get()` method.  
     * This method must be chained to the `SPARouter.get()` method.
     * @method
     * @param {string} name route name
     * @example
     * router = new SPARouter(options)
     * router.get("/user/login", function(req, router){
     * // some functions here
     * 
     * 
     * }).setName("user-login");
     * 
     * router.get("/user/home", function(req, router){
     * console.log(router.pathFor("user-home")) // outputs: /user/home
     * console.log(router.pathFor("user-login")) // outputs: /user/login
     * 
     * }).setName("user-home")
     */

  }, {
    key: "setName",
    value: function setName(name) {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("name");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("name", "string", name);
      var targetRoute = this.routes[this.routes.length - 1];
      this.routes.forEach(function (route) {
        if (route.name === name) throw new Error("Duplicate naming. A route with name ".concat(name, " already exists"));
      });
      targetRoute.name = name;
      return this;
    }
    /**
     * Initialize the Router.  
     * Call this method after setting up all route paths.
     * @method
     * @example
     * const router = new SPARouter(myOptions);
     * router.get("/", homeCallback);
     * router.get("/about", aboutCallback).setName("about");
     * router.get("/contact", contactCallback).setName("contact");
     * router.notFoundHandler(myNotFoundHandler);
     * router.init();
     */

  }, {
    key: "init",
    value: function init() {
      var _this = this;

      this.routes.forEach(function (route) {
        _this._proccessRegExp(route);
      }, this);
      var found = false;
      var routerObj = {
        pathFor: function pathFor(name, parameter) {
          return _this._pathFor(name, parameter);
        },
        goTo: function goTo(url, data, title) {
          return _this._goTo(url, data, title);
        },
        historyMode: this._historyMode
      };
      this.routes.some(function (route) {
        if (_this._requestPath().match(route.regExp)) {
          route.current = true;
          found = true;
          var request = {};
          request.param = _this._processRequestParameters(route);
          request.query = _this.query;
          request.uri = window.location.pathname;
          return route.callback.call(route.thisArg, request, routerObj);
        }
      }, this);

      if (!found) {
        if (!this._notFoundFunction) return;
        var request = {};
        request.uri = window.location.pathname;
        return this._notFoundFunction(request, routerObj);
      }
    }
    /**
     * A callback handler to execute if no route is matched.
     * @method
     * @param {function} callback Callback function
     * @example
     * router.notFoundHandler(function(){
     * console.log("page not found");
     * // or redirect to the 404 page
     * // or do anything you want!
     * });
     */

  }, {
    key: "notFoundHandler",
    value: function notFoundHandler(callback) {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(callback)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("callback");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isFunction(callback)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("callback", "function", callback);
      this._notFoundFunction = callback;
      return this;
    }
    /**
     * Redirect one url to another
     * @method
     * @private
     * @todo create api for redirecting routes
     */

  }, {
    key: "redirect",
    value: function redirect(oldUrl, newUrl) {
      /*if(this._caseInsensitive){
          oldUrl = oldUrl.toLowerCase();
          newUrl = newUrl.toLowerCase();
      }
        if(oldUrl === newUrl) throw new Error("Redirect loop found as both urls are the same");
        if(typeof oldUrl === "string"){
          this._getParameters(oldUrl, (params, newRoute)=>{
              oldUrl = newRoute;
          });
      }
        if (this._requestPath().match(`${oldUrl}$`)){
          return window.location.href= newUrl;
      }*/
      return this;
    }
    /**
     * Route grouping
     * @method
     * @todo create api for grouping routes
     * @private
     */

  }, {
    key: "group",
    value: function group() {}
  }, {
    key: "_goTo",
    value: function _goTo(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(url)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("url");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(url)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("url", "string", url);
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(url)) throw new TypeError("url cannot be empty");

      if (!this._historyMode) {
        var storage = window.localStorage;
        storage.setItem("pushState", data);
        return window.location.href = url;
      }

      window.history.pushState(data, title, url);
      return this.init();
    }
  }, {
    key: "_pathFor",
    value: function _pathFor(name) {
      var _this2 = this;

      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("name");
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(name)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("name", "string", string);
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(name)) throw new TypeError("name cannot be empty");
      var nameFound = false;
      var uri;
      this.routes.some(function (route) {
        if (route.name === name) {
          nameFound = true;
          uri = route.uri;

          if (_this2._containsParameter(uri)) {
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isSet(paramaters)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentNotFoundError"]("parameters");
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isObject(parameters)) throw new _utils_js__WEBPACK_IMPORTED_MODULE_0__["ArgumentTypeError"]("parameters", "object", parameters);
            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(parameters)) throw new TypeError("parameters cannot be empty");
            var array = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = route.uri.match(/\{(\w+)\}/g)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var value = _step.value;
                value = value.replace("{", "");
                value = value.replace("}", "");
                array.push(value);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            if (array.length !== Object.getOwnPropertyNames(parameters).length) throw new Error("The route with name [".concat(name, "] contains ").concat(array.length, " parameters. ").concat(Object.getOwnPropertyNames(parameters).length, " given"));

            for (var parameter in parameters) {
              if (!array.includes(parameter)) throw new Error("Invalid parameter name [".concat(parameter, "]"));
              var r = new RegExp("{".concat(parameter, "}"), "g");
              uri = uri.replace(r, parameters[parameter]);
            }
          }
        }
      });
      if (!nameFound) throw new Error("Invalid route name [".concat(name, "]"));
      return uri;
    }
  }, {
    key: "_proccessParameters",
    value: function _proccessParameters(uri) {
      var parameters = [];
      var sn = 0;

      if (this._containsParameter(uri)) {
        uri.replace(/\{\w+\}/g, function (parameter) {
          sn++;
          parameter.replace(/\w+/, function (parameterName) {
            var obj = {};
            obj[parameterName] = {
              sn: sn,
              regExp: "([^\\/]+)",
              // catch any word except '/' forward slash
              value: null
            };
            parameters.push(obj);
          });
        });
      }

      return parameters;
    }
  }, {
    key: "_proccessRegExp",
    value: function _proccessRegExp(route) {
      var regExp = route.uri; // escape special characters

      regExp = regExp.replace(/\//g, "\\/");
      regExp = regExp.replace(/\./g, "\\.");
      regExp = regExp.replace("/", "/?");

      if (this._containsParameter(route.uri)) {
        //replace uri parameters with their regular expression
        regExp.replace(/{\w+}/g, function (parameter) {
          var parameterName = parameter.replace("{", "");
          parameterName = parameterName.replace("}", "");
          route.parameters.some(function (i) {
            if (i[parameterName] !== undefined) {
              regExp = regExp.replace(parameter, i[parameterName].regExp);
              return regExp;
            }
          });
          return parameter;
        });
      }

      regExp = "^".concat(regExp, "$");
      route.regExp = new RegExp(regExp);
      return route;
    }
  }, {
    key: "_containsParameter",
    value: function _containsParameter(uri) {
      return uri.search(/{\w+}/g) >= 0;
    }
  }, {
    key: "_processRequestParameters",
    value: function _processRequestParameters(route) {
      var routeMatched = this._requestPath().match(route.regExp);

      if (!routeMatched) return;
      var param = {};
      routeMatched.forEach(function (value, index) {
        if (index !== 0) {
          var key = Object.getOwnPropertyNames(route.parameters[index - 1]);
          param[key] = value;
        }
      });
      return param;
    }
  }, {
    key: "_requestPath",
    value: function _requestPath() {
      return window.location.pathname;
    }
  }, {
    key: "_checkHistoryMode",
    value: function _checkHistoryMode() {
      var _this3 = this;

      if (!this._historyMode) return;
      if (!window.PopStateEvent && !"pushState" in history) return; // check for support of popstate event and pushstate in browser

      window.addEventListener("popstate", function (e) {
        _this3.init();
      });
      return this;
    }
    /**
     * The request object is passed as a callback parameter
     * @typedef {Object} request
     * @property {Object} param an object of parameters and their value.
     * @property {string} uri the current request uri
     */

    /**
     * The router object is also passed as a callback parameter
     * @typedef {Object} router
     * @property {pathFor} pathFor
     * @property {goTo} goTo
     * @property {boolean} historyMode check if history mode is set
     */

    /**
     * Returns the uri path for a named route.  
     * If the route has parameters, an object of the parameter name as ``key`` and parameter value as ``value`` should be passed as second argument.
     * @typedef {function} pathFor
     * @memberof router
     * @param {string} name The name of the route
     * @param {Object} [parameter] An object of keys and values containing the parameters of the route and its corresponding value.
     * @returns {string} uri
     * @example
     * var router = new SPARouter(options);
     * router.get("/blog/{slug}", function(req, router){
     * console.log(router.pathFor("blog-post", { slug: "hello-world"})) //outputs: /blog/hello-world
     * }).setName("blog-post");
     */

    /**
     * Use this method if you would like to **go to** or **redirect** to a link.  
     * This method uses window.location.href parsing the url param as the href.  
     * If the historyMode method is set to true, it utilizes the history.pushState() passing
     * the params and reinitializing the router.
     * @typedef {function} goTo
     * @memberof router
     * @param {string} url The url you wish to goto. An absolute url is also acceptable so long it's of the same origin.
     * @param {Object} [data={}] an object of data for HTML history.pushState()
     * @param {string} [title=""] title for HTML history.pushState()
     */

  }]);

  return SPARouter;
}();

/* harmony default export */ __webpack_exports__["default"] = (SPARouter);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: ArgumentNotFoundError, ArgumentTypeError, Utils, QueryParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArgumentNotFoundError", function() { return ArgumentNotFoundError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArgumentTypeError", function() { return ArgumentTypeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryParams", function() { return QueryParams; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "isString",
    value: function isString(variable) {
      return Object.prototype.toString.call(variable) === "[object String]";
    }
  }, {
    key: "isNumber",
    value: function isNumber(variable) {
      return Object.prototype.toString.call(variable) === "[object Number]";
    }
  }, {
    key: "isRegExp",
    value: function isRegExp(variable) {
      return Object.prototype.toString.call(variable) === "[object RegExp]";
    }
  }, {
    key: "isArray",
    value: function isArray(variable) {
      return Object.prototype.toString.call(variable) === "[object Array]";
    }
  }, {
    key: "isObject",
    value: function isObject(variable) {
      return Object.prototype.toString.call(variable) === "[object Object]";
    }
  }, {
    key: "isFunction",
    value: function isFunction(variable) {
      return Object.prototype.toString.call(variable) === "[object Function]";
    }
  }, {
    key: "isBoolean",
    value: function isBoolean(variable) {
      return Object.prototype.toString.call(variable) === "[object Boolean]";
    }
  }, {
    key: "isNull",
    value: function isNull(variable) {
      return Object.prototype.toString.call(variable) === "[object Null]";
    }
  }, {
    key: "isUndefined",
    value: function isUndefined(variable) {
      return Object.prototype.toString.call(variable) === "[object Undefined]";
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(variable) {
      return this.isUndefined(variable) || this.isNull(variable) || variable === 0 || variable === false || (this.isString(variable) || this.isArray(variable)) && variable.length === 0 || this.isObject(variable) && Object.getOwnPropertyNames(variable).length === 0;
    }
  }, {
    key: "isSet",
    value: function isSet(variable) {
      return !this.isUndefined(variable) && !this.isNull(variable);
    }
  }]);

  return Utils;
}();

Utils = new Utils();
function ArgumentNotFoundError(argName) {
  var name = "ArgumentNotFoundError";
  var message = Utils.isSet(argName) ? "".concat(argName, " argument is required. None found") : "Required argument was not found";
  var instance = new Error(message);
  instance.name = name;
  instance.message = message;

  instance.toString = function () {
    return instace.message;
  };

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ArgumentNotFoundError);
  }

  return instance;
}
function ArgumentTypeError(argName, argType, argValue) {
  argType = Utils.isSet(argType) ? argType.toString() : _typeof(argType);
  var name = "ArgumentTypeError";
  var message = Utils.isSet(argName) ? "typeof ".concat(argName.toString(), " argument must be equal to ").concat(argType, ". ").concat(_typeof(argValue), " found.") : "Invalid argument type found";
  var instance = new Error(message);
  instance.name = name;
  instance.message = message;

  instance.toString = function () {
    return this.message;
  };

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));

  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ArgumentTypeError);
  }

  return instance;
}
ArgumentNotFoundError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});
ArgumentTypeError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(ArgumentNotFoundError, Error);
  Object.setPrototypeOf(ArgumentTypeError, Error);
} else {
  ArgumentNotFoundError.__proto__ = Error;
  ArgumentTypeError.__proto__ = Error;
} // QueryParams class constants


var KEYS = [];
var QUERIES = [];
var QUERY_STRING = "";
var HISTORY_MODE;

var DECODE = function DECODE(value) {
  return decodeURIComponent(value);
};

var DECODE_KEY = function DECODE_KEY(key) {
  return decodeURIComponent(key.split(' ').join(''));
};

var GET_PARAM = function GET_PARAM(key) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var param = null;

  if (index) {
    param = QUERIES[index][key];
  } else {
    QUERIES.some(function (query) {
      if (query.hasOwnProperty(key)) return param = query[key];
    });
  }

  return param;
};

var QueryParams =
/*#__PURE__*/
function () {
  function QueryParams() {
    var _this = this;

    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var historyMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, QueryParams);

    QUERY_STRING = url ? url : window.location.search;
    HISTORY_MODE = window.PopStateEvent && "pushState" in window.history ? historyMode : false;

    if (HISTORY_MODE) {
      window.addEventListener("popstate", function (e) {
        var event = e.currentTarget;
        QUERY_STRING = event.location.search;
        KEYS = [];
        QUERIES = [];
        return _this.init(); // re run this class again
      });
    }

    ;
    this.init();
  }

  _createClass(QueryParams, [{
    key: "init",
    value: function init() {
      if (QUERY_STRING) {
        var queryArray = QUERY_STRING.slice(1).split("&");
        queryArray.forEach(function (query) {
          query = query.split('=');
          KEYS.push(DECODE_KEY(query[0]));
          var obj = {};
          obj[DECODE_KEY(query[0])] = query.length > 1 ? DECODE(query[1]) : true; // return true if search query has no value

          QUERIES.push(obj);
        }, this);
      }
    }
  }, {
    key: "keys",
    value: function keys() {
      return KEYS;
    }
  }, {
    key: "has",
    value: function has(key) {
      key = DECODE_KEY(key);
      return KEYS.length > 0 && GET_PARAM(key) ? true : false;
    }
  }, {
    key: "get",
    value: function get(key) {
      key = DECODE_KEY(key);
      return this.has(key) ? GET_PARAM(key) : null;
    }
  }, {
    key: "getAll",
    value: function getAll(key) {
      key = DECODE_KEY(key);
      return this.has(key) ? GET_PARAM(key).split(',') : [];
    }
  }, {
    key: "toString",
    value: function toString() {
      var string = "";

      if (QUERY_STRING) {
        string = "?";
        KEYS.forEach(function (key, index) {
          var value = GET_PARAM(key, index) === true ? '' : "=".concat(GET_PARAM(key, index));
          var newString = index === 0 ? key + value : "&".concat(key + value);
          string += newString;
        });
      }

      return string;
    }
  }, {
    key: "append",
    value: function append(key, value) {
      if (!Utils.isSet(key)) throw new ArgNotFound("key");
      key = DECODE_KEY(key);
      value = Utils.isSet(value) ? DECODE(value) : true;
      var index = KEYS.push(key) - 1;
      QUERIES[index] = _defineProperty({}, key, value);
      QUERY_STRING = QUERY_STRING ? this.toString() : true;

      if (HISTORY_MODE) {
        window.history.pushState('', '', this.toString());
      }

      return GET_PARAM(key, index);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (!Utils.isSet(key)) throw new ArgNotFound("key");
      key = DECODE_KEY(key);
      value = Utils.isSet(value) ? DECODE(value) : true;
      QUERY_STRING = QUERY_STRING ? QUERY_STRING : true;
      var index = KEYS.indexOf(key);

      if (index !== -1) {
        KEYS[index] = key; // replace the key if it exists else append new key

        QUERIES[index] = _defineProperty({}, key, value);
      } else {
        index = KEYS.push(key) - 1;
        QUERIES[index] = _defineProperty({}, key, value);
      }

      QUERY_STRING = QUERY_STRING ? this.toString() : true;

      if (HISTORY_MODE) {
        window.history.pushState('', '', this.toString());
      }

      return GET_PARAM(key, index);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      if (!Utils.isSet(key)) throw new ArgNotFound("key");
      key = DECODE_KEY(key);
      if (!this.has(key)) return this.has(key); // definitely returns false if key doesn't exist

      var index = KEYS.indexOf(key);
      var value = QUERIES[index][key];
      KEYS.splice(index, 1);
      QUERIES.splice(index, 1);
      QUERY_STRING = QUERY_STRING ? this.toString() : true;

      if (HISTORY_MODE) {
        window.history.pushState('', '', this.toString());
      }

      return value;
    }
  }]);

  return QueryParams;
}();



/***/ })

/******/ })["default"];
});

},{}],11:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":13}],12:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/createError":19,"./../core/settle":23,"./../helpers/buildURL":27,"./../helpers/cookies":29,"./../helpers/isURLSameOrigin":31,"./../helpers/parseHeaders":33,"./../utils":35}],13:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":14,"./cancel/CancelToken":15,"./cancel/isCancel":16,"./core/Axios":17,"./core/mergeConfig":22,"./defaults":25,"./helpers/bind":26,"./helpers/spread":34,"./utils":35}],14:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],15:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":14}],16:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],17:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":27,"./../utils":35,"./InterceptorManager":18,"./dispatchRequest":20,"./mergeConfig":22}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":35}],19:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":21}],20:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":16,"../defaults":25,"./../helpers/combineURLs":28,"./../helpers/isAbsoluteURL":30,"./../utils":35,"./transformData":24}],21:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],22:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":35}],23:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":19}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":35}],25:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))
},{"./adapters/http":12,"./adapters/xhr":12,"./helpers/normalizeHeaderName":32,"./utils":35,"_process":37}],26:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],27:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":35}],28:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":35}],30:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],31:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":35}],32:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":35}],33:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":35}],34:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],35:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":26,"is-buffer":36}],36:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

},{}],37:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[4]);
