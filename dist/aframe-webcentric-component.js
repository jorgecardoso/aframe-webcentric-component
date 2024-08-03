(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n/**\r\n * Web-Centric component for A-Frame.\r\n */\n\n\nAFRAME.registerComponent('webcentric', {\n  schema: {\n    camerarig: {\n      type: \"selector\",\n      default: \"#camerarig\"\n    }\n  },\n\n  /**\r\n   * Set if component needs multiple instancing.\r\n   */\n  multiple: false,\n\n  /**\r\n   * Called once when component is attached. Generally for initial setup.\r\n   */\n  init: function () {\n    THREE.Math = {\n      //Fix\n      degToRad: THREE.MathUtils.degToRad,\n      radToDeg: THREE.MathUtils.radToDeg,\n      randInt: THREE.MathUtils.randInt,\n      randFloat: THREE.MathUtils.randFloat\n    };\n\n    let _this = this;\n\n    this._hasStats = false;\n    let scene = this.el.sceneEl;\n\n    if (scene.hasLoaded) {\n      run();\n    } else {\n      scene.addEventListener('loaded', run);\n    }\n\n    function run() {\n      console.log(scene.hasAttribute('stats'));\n\n      if (scene.hasAttribute('stats')) {\n        _this._hasStats = true;\n        _this._curPosition = new THREE.Vector3();\n        _this._curRotation = new THREE.Vector3();\n        _this._lastPosition = new THREE.Vector3();\n        _this._lastRotation = new THREE.Vector3(); // this._statsPanel = document.querySelector\n      }\n    }\n\n    let cameraRig = this.data.camerarig;\n\n    if (!cameraRig) {\n      console.warn(\"No camera rig found. Trying to use camera parent\");\n      let camParent = document.querySelector(\"[camera]\").parentElement;\n\n      if (camParent === this.sceneEl) {\n        console.warn(\"No camera parent found\");\n        return;\n      } else {\n        console.info(\"Found camera parent: \", camParent);\n        cameraRig = camParent;\n      }\n    }\n\n    let cameraRotString = null;\n    let cameraPosString = null;\n\n    if (window.location.search) {\n      console.log(window.location.search);\n      let params = new URLSearchParams(window.location.search);\n\n      if (params.get(\"cameraRot\")) {\n        cameraRotString = params.get(\"cameraRot\");\n      }\n\n      if (params.get(\"cameraPos\")) {\n        cameraPosString = params.get(\"cameraPos\");\n      }\n    }\n\n    console.log(cameraPosString, cameraRotString);\n\n    if (!cameraRotString || !cameraPosString) {\n      if (window.location.hash) {\n        console.log(window.location.hash);\n        let params = new URLSearchParams(window.location.hash.substring(1));\n\n        if (params.get(\"cameraRot\")) {\n          cameraRotString = params.get(\"cameraRot\");\n        }\n\n        if (params.get(\"cameraPos\")) {\n          cameraPosString = params.get(\"cameraPos\");\n        }\n      }\n    }\n\n    if (cameraPosString) {\n      //let cameraPos = cameraPosString.split(\",\").map(v => parseFloat(v));\n      let cameraPos = cameraPosString.replace(/,/g, \" \");\n      console.log(cameraPos);\n      cameraRig.setAttribute(\"position\", cameraPos);\n    }\n\n    if (cameraRotString) {\n      //let cameraPos = cameraPosString.split(\",\").map(v => parseFloat(v));\n      let cameraRot = cameraRotString.replace(/,/g, \" \");\n      console.log(cameraRot);\n      cameraRig.setAttribute(\"rotation\", cameraRot);\n    }\n    /* if (params) {\r\n         var hash = params.substr(1);\r\n         let split = hash.split(\"&\");\r\n         if (split.length > 1) {\r\n           var result = hash.split(\"&\").reduce(function (result, item) {\r\n             var parts = item.split(\"=\");\r\n             result[parts[0]] = parts[1].replace(/,/g, \" \");\r\n             return result;\r\n           }, {});\r\n           console.log(result);\r\n           cameraRig.setAttribute(\"rotation\", result.cameraRot);\r\n           cameraRig.setAttribute(\"position\", result.cameraPos);\r\n         }\r\n    */\n\n\n    window.addEventListener('popstate', function (event) {\n      // Log the state data to the console\n      console.log(event);\n\n      if (window.location.hash) {\n        console.log(window.location.hash);\n        let params = new URLSearchParams(window.location.hash.substring(1));\n\n        if (params.get(\"cameraRot\")) {\n          cameraRotString = params.get(\"cameraRot\");\n        }\n\n        if (params.get(\"cameraPos\")) {\n          cameraPosString = params.get(\"cameraPos\");\n        }\n      }\n\n      let cam = document.querySelector(\"[camera]\");\n      cam.setAttribute(\"position\", `0 ${cam.object3D.position.y} 0`); //cam.object3D.position = new THREE.Vector3(0, cam.object3D.position.y, 0)\n\n      if (cameraPosString) {\n        //let cameraPos = cameraPosString.split(\",\").map(v => parseFloat(v));\n        let cameraPos = cameraPosString.replace(/,/g, \" \");\n        console.log(cameraPos);\n        cameraRig.setAttribute(\"position\", cameraPos);\n      }\n\n      if (cameraRotString) {\n        //let cameraPos = cameraPosString.split(\",\").map(v => parseFloat(v));\n        let cameraRot = cameraRotString.replace(/,/g, \" \");\n        console.log(cameraRot);\n        cameraRig.setAttribute(\"rotation\", cameraRot);\n        cam.components['look-controls'].pitchObject.rotation.x = 0;\n        cam.components['look-controls'].yawObject.rotation.y = 0;\n      }\n    });\n  },\n\n  /**\r\n   * Called when component is attached and when component data changes.\r\n   * Generally modifies the entity based on the data.\r\n   */\n  update: function (oldData) {},\n\n  /**\r\n   * Called when a component is removed (e.g., via removeAttribute).\r\n   * Generally undoes all modifications to the entity.\r\n   */\n  remove: function () {},\n\n  /**\r\n   * Called on each scene tick.\r\n   */\n  tick: function (t) {\n    if (this._hasStats) {\n      if (!this._statsPanel) {\n        this._statsPanel = document.querySelector(\".rs-base\");\n\n        let statsPanelContainer = this._statsPanel.querySelector(\".rs-container\");\n\n        let title = document.createElement(\"h1\");\n        title.innerText = \"Camera (World)\";\n        statsPanelContainer.appendChild(title);\n        let container = document.createElement(\"div\");\n        container.classList.add(\"rs-group\");\n        let counterBasePosition = document.createElement(\"div\");\n        counterBasePosition.classList.add(\"rs-counter-base\");\n        counterBasePosition.innerHTML = '<span class=\"rs-counter-id\">Position</span>';\n        this._containerPosition = document.createElement(\"div\");\n\n        this._containerPosition.classList.add(\"rs-counter-value\");\n\n        this._containerPosition.style = \"width: 200px\";\n        counterBasePosition.appendChild(this._containerPosition);\n        container.appendChild(counterBasePosition);\n        let counterBaseRotation = document.createElement(\"div\");\n        counterBaseRotation.classList.add(\"rs-counter-base\");\n        counterBaseRotation.innerHTML = '<span class=\"rs-counter-id\">Rotation</span>';\n        this._containerRotation = document.createElement(\"div\");\n\n        this._containerRotation.classList.add(\"rs-counter-value\");\n\n        this._containerRotation.style = \"width: 200px\";\n        counterBaseRotation.appendChild(this._containerRotation);\n        container.appendChild(counterBaseRotation);\n        statsPanelContainer.appendChild(container);\n        console.log(this._statsPanel);\n      }\n\n      let cam = this.el.sceneEl.querySelector(\"[camera]\"); // Round values to allow copy in the stats panel\n\n      this._curPosition.copy(cam.object3D.getWorldPosition(this._curPosition));\n\n      this._curPosition.x = this._curPosition.x.toFixed(3);\n      this._curPosition.y = this._curPosition.y.toFixed(3);\n      this._curPosition.z = this._curPosition.z.toFixed(3);\n      let quaternion = new THREE.Quaternion();\n      cam.object3D.getWorldQuaternion(quaternion);\n      let euler = new THREE.Euler();\n      euler.setFromQuaternion(quaternion, \"XZY\");\n\n      this._curRotation.copy(euler);\n\n      this._curRotation.x = THREE.Math.radToDeg(this._curRotation.x).toFixed(3);\n      this._curRotation.y = THREE.Math.radToDeg(this._curRotation.y).toFixed(3);\n      this._curRotation.z = THREE.Math.radToDeg(this._curRotation.z).toFixed(3); //console.log(this._curRotation);\n      //console.log(this._lastRotation);\n\n      if (!this._curPosition.equals(this._lastPosition)) {\n        this._containerPosition.innerText = `${this._curPosition.x} ${this._curPosition.y}  ${this._curPosition.z}`;\n\n        this._lastPosition.copy(this._curPosition);\n      }\n\n      if (!this._curRotation.equals(this._lastRotation)) {\n        this._containerRotation.innerText = `${this._curRotation.x} ${this._curRotation.y}  ${this._curRotation.z}`;\n\n        this._lastRotation.copy(this._curRotation);\n      }\n    } //console.log(\"tick\")\n\n  },\n\n  /**\r\n   * Called when entity pauses.\r\n   * Use to stop or remove any dynamic or background behavior such as events.\r\n   */\n  pause: function () {},\n\n  /**\r\n   * Called when entity resumes.\r\n   * Use to continue or add any dynamic or background behavior such as events.\r\n   */\n  play: function () {},\n\n  /**\r\n   * Event handlers that automatically get attached or detached based on scene state.\r\n   */\n  events: {// click: function (evt) { }\n  }\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });
});