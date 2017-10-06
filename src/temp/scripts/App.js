/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Slider = __webpack_require__(1);

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slider = new _Slider2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slider = function () {
  function Slider() {
    _classCallCheck(this, Slider);

    this.sliderContainer = document.querySelector('.slider__container');
    this.labels = document.querySelectorAll('.slider__label');
    this.slider = document.querySelector('.slider__slide');
    this.slideWidth = undefined;
    this.startingX = undefined;
    this.longTouch = undefined;
    this.moveX = undefined;
    this.index = 0;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.recalcAndMove = this.recalcAndMove.bind(this);
    this.labelsOnClick = this.labelsOnClick.bind(this);

    this.events();
    this.checkForOrientation();
  }

  _createClass(Slider, [{
    key: 'events',
    value: function events() {
      var _this = this;

      this.sliderContainer.addEventListener('touchstart', this.onTouchStart);
      this.sliderContainer.addEventListener('touchmove', this.onTouchMove);
      this.sliderContainer.addEventListener('touchend', this.onTouchEnd);
      this.labels.forEach(function (label) {
        label.addEventListener('click', _this.labelsOnClick);
      });
    }
  }, {
    key: 'checkForOrientation',
    value: function checkForOrientation() {
      var mql = window.matchMedia('(orientation: portrait)');
      mql.addListener(this.recalcAndMove);
    }
  }, {
    key: 'recalcAndMove',
    value: function recalcAndMove(m) {
      var slider = this.slider;
      var sliderContainer = this.sliderContainer;
      var index = this.index;

      if (m.matches || !m.matches) {
        setTimeout(function () {
          sliderContainer.classList.remove('animate');
          var newWidth = parseInt(document.defaultView.getComputedStyle(slider, null).getPropertyValue('width'));

          sliderContainer.style.transform = 'translateX(-' + index * newWidth + 'px)';
        }, 10);
      }
    }
  }, {
    key: 'labelsOnClick',
    value: function labelsOnClick(e) {
      if (e.target.classList.contains('slider__label--active')) return;

      this.labels.forEach(function (label) {
        label.classList.remove('slider__label--active');
      });

      e.target.classList.add('slider__label--active');

      this.slideWidth = parseInt(document.defaultView.getComputedStyle(this.slider, null).getPropertyValue('width'));

      this.sliderContainer.classList.add('animate');

      switch (e.target.id) {
        case 'label-0':
          this.index = 0;
          this.sliderContainer.style.transform = 'translateX(-' + this.index * this.slideWidth + 'px)';
          break;
        case 'label-1':
          this.index = 1;
          this.sliderContainer.style.transform = 'translateX(-' + this.index * this.slideWidth + 'px)';
          break;
        case 'label-2':
          this.index = 2;
          this.sliderContainer.style.transform = 'translateX(-' + this.index * this.slideWidth + 'px)';
          break;
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      var _this2 = this;

      this.sliderContainer.classList.remove('animate');

      this.longTouch = false;
      setTimeout(function () {
        _this2.longTouch = true;
        console.log(_this2.longTouch);
      }, 250);

      this.startingX = e.touches[0].clientX;
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      this.slideWidth = parseInt(document.defaultView.getComputedStyle(this.slider, null).getPropertyValue('width'));

      var touchMoveX = e.touches[0].clientX;
      this.moveX = this.index * this.slideWidth + (this.startingX - touchMoveX);

      if (this.moveX < this.slideWidth * 2) {
        this.sliderContainer.style.transform = 'translateX(-' + this.moveX + 'px)';
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      var absMove = Math.abs(this.index * this.slideWidth - this.moveX);

      if (absMove > this.slideWidth / 3 || this.longTouch === false) {
        if (this.moveX > this.index * this.slideWidth && this.index < 2) {
          this.index++;
        } else if (this.moveX < this.index * this.slideWidth && this.index > 0) {
          this.index--;
        }
      }

      this.labels.forEach(function (label) {
        label.classList.remove('slider__label--active');
      });

      this.labels[this.index].classList.add('slider__label--active');

      this.sliderContainer.classList.add('animate');
      this.sliderContainer.style.transform = 'translateX(-' + this.index * this.slideWidth + 'px)';
    }
  }]);

  return Slider;
}();

exports.default = Slider;

/***/ })
/******/ ]);