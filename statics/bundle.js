(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = exports.intent = void 0;

var _sparouter = _interopRequireDefault(require("@kodnificent/sparouter"));

var _header = require("./src/header.js");

var _form = require("./src/form.js");

var _blank = require("./src/blank.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  historyMode: true
};
var router = new _sparouter["default"](options);

var render = function render(component) {
  var initState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mountNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'app';
  console.log("ran");

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
router.get('/', function (req, res) {
  render(_header.Header);
  render(_blank.Blank, {}, 'main');
});
router.get('/login', function (req, res) {
  render(_header.Header);
  render(_form.Form, {}, "main");
}); // initialize router

router.init();

},{"./src/blank.js":3,"./src/form.js":4,"./src/header.js":5,"@kodnificent/sparouter":6}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Form = void 0;

var _main = require("../main.js");

var Form = function Form(_ref) {
  var render = _ref.render;
  var state = {
    username: "",
    email: "",
    password: "",
    render: render
  };
  (0, _main.intent)("capInput", function (e) {
    state.username = (0, _main.value)("username");
    state.email = (0, _main.value)("email");
    state.password = (0, _main.value)("password");
    state.render(representation());
    return false;
  });

  var representation = function representation() {
    return "\n\t<div class=\"formCont\">\n\t\t<h3>Register</h3>\n\t\t<form class=\"form\" action=\"\">\n\t\t\t<div class=\"userNameCont\">\n\t\t\t\t<label class=\"regLab\" for=\"username\">Username</label>\n\t\t\t\t<input id=\"username\" type=\"text\" >\n\t\t\t</div>\n\t\t\t<div class=\"emailCont\">\n\t\t\t\t<label class=\"regLab\" for=\"email\">Email</label>\n\t\t\t\t<input id=\"email\" type=\"email\">\n\t\t\t</div>\n\t\t\t<div class=\"passwordCont\">\n\t\t\t\t<label class=\"reg\" for=\"passOne\">Password One</label>\n\t\t\t\t<input id=\"password\" type=\"password\">\n\t\t\t</div>\n\t\t\t<div class=\"passwordCont\">\n\t\t\t\t<label class=\"reg\" for=\"passTwo\">Password Two</label>\n\t\t\t\t<input type=\"password\">\n\t\t\t</div>\n\t\t\t<button class=\"submit\" onclick=capInput()>Test</button>\n\t\t</form>\n\t</div>\n\t";
  };

  return representation;
};

exports.Form = Form;

},{"../main.js":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

var _navigate = require("../helpers/navigate.js");

var _main = require("../main.js");

var Header = function Header(_ref) {
  var render = _ref.render;
  (0, _main.intent)("navigateLogin", function (e) {
    (0, _navigate.onNavigate)('/login');
  });
  (0, _main.intent)("navigateHome", function (e) {
    (0, _navigate.onNavigate)("/");
  });

  var representation = function representation() {
    return "\n\t<div class=\"navCont\">\n\t\t<nav class=\"navbar\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"navButton\" onclick=navigateHome()>Home</li>\n\t\t\t\t<li class=\"navButton\">Play</li>\n\t\t\t\t<li class=\"navButton\">Account</li>\n\t\t\t\t<li class=\"navButton\" onclick=navigateLogin()>Login</li>\n\t\t\t</ul>\n\t\t</nav>\n\t</div>\n\t";
  };

  return representation;
};

exports.Header = Header;

},{"../helpers/navigate.js":1,"../main.js":2}],6:[function(require,module,exports){
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

},{}]},{},[2]);
