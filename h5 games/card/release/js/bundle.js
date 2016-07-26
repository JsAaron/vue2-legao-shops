/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./release//js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var layerOpen =layer.open({
	    type: 2,
	    content: '数据加载中...'
	});

	//算法
	var algorithm = CardGameConfig.algorithm;
	var confCount = Object.keys(algorithm.conf);
	var prizeRandom = CardGameConfig.prizeRandom;

	//预加载图片
	var pre = __webpack_require__(1);
	pre.load(algorithm.conf, CardGameConfig.preloadimages, function() {
	       __webpack_require__(2);
	       layer.close(layerOpen)
	       layerOpen= null;
	})

/***/ },
/* 1 */
/***/ function(module, exports) {

	exports.load = function(config, loadimages,callback) {
	    var images = [];
	    var image;
	    var newimages = [];
	    for (var k in config) {
	        for (var name in config[k]) {
	            if (name === 'images') {
	                image = config[k][name]
	                images = images.concat(image.back)
	            }
	        }
	    }

	    images = images.concat(loadimages)


	    var count = images.length;

	    var complete = function(name,src) {
	        --count;
	        if(!count){
	            callback();
	        }
	    };

	    for (var i = 0; i < images.length; i++) {
	        newimages[i]     = new Image()
	        newimages[i].src = images[i];

	        newimages[i].onload = (function(src) {
	            return function() {
	                complete('onload', src)
	            }
	        })(images[i]);

	        newimages[i].onerror = (function(src) {
	            return function() {
	                complete('onerror', src)
	            }
	        })(images[i]);

	        newimages[i].onabort = (function(src) {
	            return function() {
	                complete('onabort', src)
	            }
	        })(images[i]);
	    }
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//算法
	var algorithm = CardGameConfig.algorithm;
	var confCount = Object.keys(algorithm.conf);
	var innerCall = CardGameConfig.innerCall;

	var CardGames = __webpack_require__(3);
	var utils     = __webpack_require__(8);

	//游戏时间
	var limitTime      = CardGameConfig.limitTime || 30000; //ms单位 
	//每次游戏关数
	var limitCount     = CardGameConfig.limitCount || 3;
	//允许玩的游戏次数
	var AllowPlayCount = CardGameConfig.AllowPlayCount || 3;


	//开始时间
	var _startTime = 0
	//玩的次数
	var _playCount = 0;
	//游戏次数
	var _gameTotal = 0;
	//内容节点class名
	var _className = '.content-page-card';

	var $homePage           = $('.home-page');
	var $contentPage        = $('.content-page');
	var $lotteryPage        = $('.lottery-page');
	var $winningPage        = $('.winning-page');
	var $element            = $('.banner-right .score');
	var $lotteryPlay        = $('.winning-box-left');
	var $lotteryLottery     = $('.lottery-lottery');//抽奖
	var $startButton        = $('.start-button');
	var $tooltipBox         = $(".tooltip-box");
	var $shareFriends       = $(".winning-box-right");

	/**
	 * 
	 * 音乐
	 * @return {[type]} [description]
	 */
	var Music = function() {
	    var instance = null; //存放不同音轨的一个实例
	    return {
	        paly: function(url) {
	            var audio;
	            if (instance) {
	                audio = instance;
	                audio.src = url;
	            } else {
	                audio = new Audio(url);
	            }
	            audio.autoplay = true;
	            audio.play();
	            //更新音轨
	            instance = audio;
	        }
	    }
	}();


	/**
	 * 分数更新
	 * @type {Number}
	 */
	var addScore = CardGameConfig.score.add || 10;
	var subtractScore =  CardGameConfig.score.subtract || 3;
	var integral = function() {
	    var $element = $('.banner-right .score');
	    var score = 0;
	    //更新分数
	    var update = function() {
	        $element.text(score);
	    }
	    return {
	        add: function() {
	            score += addScore;
	            update();
	            Music.paly('music/score.mp3');
	        },
	        reduce: function() {
	            score -= subtractScore;
	            if (score < 1) {
	                score = 0;
	            }
	            update();
	        },
	        reset: function() {
	            score = 0;
	            update();
	        },
	        get: function() {
	            return score;
	        }
	    }
	}();

	/**
	 * 倒计时处理
	 * @return {[type]} [description]
	 */
	var slidebox = new function() {
	    var timer;
	    var $dotWrap      = $('.dot-wrap');
	    var $ems          = $dotWrap.find('em')
	    var vernier       = $ems.length;
	    var rate          = limitTime / vernier;
	    var self          = this;
	    var timercallabck = null;

	    function clear() {
	        clearTimeout(timer)
	        timer = null;
	    }

	    function updatedot() {
	        var em;
	        if (em = $ems[--vernier]) {
	            em.style.backgroundColor = '#BCDFF4';
	        }
	        if (!em) {
	            clear()
	            overTime(timercallabck);
	            return;
	        }
	    }

	    function run() {
	        timer = setTimeout(function() {
	            updatedot();
	            timer && run();
	        }, rate)
	    }

	    self.start = function() {
	        run();
	    }

	    self.destroy = function() {
	        clear();
	        vernier = $ems.length;
	        $ems.css('backgroundColor', '#FFED42')
	    }

	    self.watch = function(timeout, callback) {
	        timercallabck = callback;
	    }

	}

	/**
	 * 超时处理
	 * @return {[type]} [description]
	 */
	function overTime(callback) {
	    var l = layer.open({
	        // style: 'border:none; background-color:#78BA32; color:#fff;',
	        _className: 'popuo-login',
	        btn: ['OK'],
	        content: '游戏超时，请重新开始游戏！',
	        yes: function(elem) {
	            callback();
	            resetGames();
	            layer.close(l)
	            l = null;
	        }
	    })
	}

	/**
	 * 开始游戏
	 * @return {[type]} [description]
	 */
	function createGames() {
	    slidebox.start();
	    ++_gameTotal;

	    var config
	    if (confCount != 1) {
	        config = algorithm.conf[_gameTotal]
	    }
	    if(!config){
	        config = algorithm.conf[1];
	    }

	    var cardGames = new CardGames(_className, config)
	    cardGames.$watch('success', integral.add)
	    cardGames.$watch('fail', integral.reduce)
	    cardGames.$watch('complete', function() {
	        slidebox.destroy();
	        cardGames.destroy();
	        selectGame()
	    });
	    //超时回调
	    slidebox.watch('timeout', function() {
	        slidebox.destroy();
	        cardGames.destroy();
	    })
	}


	/**
	 * 选择游戏
	 * @return {[type]} [description]
	 */
	function selectGame() {
	    //游戏结束
	    if (_gameTotal >= limitCount) {
	        GameOver();
	        return;
	    }
	    //过关提示
	    selectTooltipBox() 
	}

	/**
	 * 时间格式
	 * @return {[type]} [description]
	 */
	Number.prototype.formatTime = function() {
	    // 计算
	    var h = 0,
	        i = 0,
	        s = parseInt(this);
	    if (s > 60) {
	        i = parseInt(s / 60);
	        s = parseInt(s % 60);
	        if (i > 60) {
	            h = parseInt(i / 60);
	            i = parseInt(i % 60);
	        }
	    }
	    // 补零
	    var zero = function(v) {
	        return (v >> 0) < 10 ? "0" + v : v;
	    };
	    return [zero(h), zero(i), zero(s)].join(":");
	};


	function visible($element) {
	    $element.css('visibility', 'visible');
	}

	function hidden($element) {
	    $element.css('visibility', 'hidden');
	}

	/**
	 * 游戏结束
	 * 尾页
	 * @return {[type]} [description]
	 */
	function GameOver() {
	    Music.paly('music/through.mp3');
	    ++_playCount;
	    //处理页面逻辑
	    visible($lotteryPage);
	    hidden($contentPage);
	    hidden($winningPage);
	}


	/**
	 * 重设游戏
	 * @return {[type]} [description]
	 */
	function resetGames() {
	    _gameTotal = 0;
	    integral.reset();
	    hidden($contentPage);
	    visible($homePage)
	}

	/**
	 * 开始页面
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	function startContent(e) {
	    createGames('.content-page-card');
	    visible($contentPage)
	    $homePage.addClass('animated zoomOutUp')
	        .on(utils.style.animationend, function() {
	            $homePage.off(utils.style.animationend);
	            hidden($homePage)
	            $homePage.removeClass('animated zoomOutUp')
	            return false;
	        })
	}


	/**
	 * 开始按钮
	 * @return {[type]}    [description]
	 */
	$startButton.on(utils.event.start, function(e) {
	    innerCall.startGame(_playCount, function() {
	        startContent(e);
	    })
	    return false;
	})
	 


	function calculate(len) {
	   return Math.floor(Math.random() * 2);
	}

	var arr = ['.winning-content-fail','.winning-content-win']

	/**
	 * 点击抽奖
	 * @type {[type]}
	 */
	$lotteryLottery.on(utils.event.start, function() {
	    var className = arr[calculate(2)]
	    //动态随机中奖概率
	    var $showElement =  $winningPage.find(className);
	    $showElement.show();

	    visible($winningPage);
	    hidden($lotteryPage);

	    /**
	     * 得分页面
	     * 再玩一次
	     * @return {[type]}     [description]
	     */
	     //限制玩的次数
	    if (_playCount !== AllowPlayCount) {
	        $lotteryPlay.on(utils.event.start, function() {
	            if (!checkMobile()) {
	                return;
	            }
	            $lotteryPlay.off()
	            $showElement.hide();
	            hidden($lotteryPage)
	            resetGames();
	            return false;
	        });
	    }

	    return false;
	});
	       

	/**
	 * 验证号码
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function checkNumber(str) {
	    if(!str){
	        return true;
	    }
	    var re = /^1\d{10}$/;
	    if (re.test(str)) {
	        return true
	    } else {
	        return false
	    }
	}

	function checkMobile() {
	    var number = $("#myMobile").val();
	    if (!number) {
	        return true;
	    }
	    if(!innerCall.checkPhoneNumber){
	        return number
	    }
	    //验证手机号
	    if (!checkNumber(number)) {
	        alert('密码格式有误，请核对!')
	        return false;
	    }
	    return number;
	}
	 
	$shareFriends.on(utils.event.start, function() {
	    //验证手机号
	    var number = checkMobile();
	    if (!number) {
	        return;
	    }
	    innerCall.shareFriends(number);
	    return false;
	});


	/**
	 * 隐藏弹出框
	 */
	function HiddenTooltipBox() {
	    $tooltipBox.css('opacity', 0);
	    deleteTooltipBox();
	}

	/**
	 * 过关提示事件
	 * @return {[type]} [description]
	 */
	function BindTooltipBox() {
	    $tooltipBox.on(utils.event.start, function(event) {
	        switch (event.target.className) {
	            case "tooltip-box-left":
	                resetGames();
	                HiddenTooltipBox();
	                break;
	            case "tooltip-box-right":
	                //继续游戏
	                createGames();
	                HiddenTooltipBox();
	                break;
	        }
	        return false;
	    });

	}

	/**
	 * 消除事件
	 * @return {[type]} [description]
	 */
	function deleteTooltipBox() {
	    $tooltipBox.hide().off()
	}


	/**
	 * 过关提示
	 * @return {[type]} [description]
	 */
	function selectTooltipBox(callback) {
	    $tooltipBox
	        .show()
	        .addClass('animated zoomIn')
	        .on(utils.style.animationend, function() {
	            BindTooltipBox();
	        })
	}


	/**
	 * 测试代码
	 * @type {[type]}
	 */
	var test = false;

	if(test){
	    limitTime = 3000000;

	    hidden($contentPage);
	    hidden($homePage)
	    hidden($lotteryPage)

	        var className = arr[calculate(2)]
	    //动态随机中奖概率
	    var $showElement =  $winningPage.find('.winning-content-win');
	    $showElement.show();

	    visible($winningPage)

	   
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);

	var utils = __webpack_require__(8);

	var Manager = function(element, options) {
		this._init(element, options);
	};

	var p = Manager.prototype;

	Object.defineProperty(p, '$watch', {
		value: function(key, callback) {
			var self = this;
			this.observer.on('change:' + key, function() {
				callback.apply(self, arguments)
			})
		},
		enumerable   : true,
		configurable : true
	})


	utils.extend(p, __webpack_require__(9));
	utils.extend(p, __webpack_require__(13));
	utils.extend(p, __webpack_require__(14));
	utils.extend(p, __webpack_require__(15));
	utils.extend(p, __webpack_require__(16));
	utils.extend(p, __webpack_require__(17));

	window['CardGames'] = Manager;

	module.exports = Manager


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/sass-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".cd-gallery li.is-visible {\n  position: relative;\n  z-index: 5; }\n\n.cd-item-wrapper > li {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  border-radius: 0.25em;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }\n\n.cd-gallery li.is-hidden {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1;\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n.cd-gallery .cd-item-wrapper > li {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden; }\n\n.cd-gallery .cd-item-wrapper > li img {\n  display: block;\n  width: 100%;\n  border-radius: 0.45em; }\n\n.cd-item-wrapper.is-switched .is-visible {\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n  -webkit-animation: cd-rotate 0.5s;\n  -moz-animation: cd-rotate 0.5s;\n  animation: cd-rotate 0.5s; }\n\n.cd-item-wrapper.is-switched .is-hidden {\n  -webkit-transform: rotateY(0);\n  -moz-transform: rotateY(0);\n  -ms-transform: rotateY(0);\n  -o-transform: rotateY(0);\n  transform: rotateY(0);\n  -webkit-animation: cd-rotate-inverse 0.5s;\n  -moz-animation: cd-rotate-inverse 0.5s;\n  animation: cd-rotate-inverse 0.5s;\n  opacity: 0; }\n\n.cd-gallery .cd-item-wrapper.is-switched .is-selected {\n  opacity: 1; }\n\n/* -------------------------------- \r\n\r\nxkeyframes \r\n\r\n-------------------------------- */\n@-webkit-keyframes cd-rotate {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(0); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(180deg); } }\n\n@-moz-keyframes cd-rotate {\n  0% {\n    -moz-transform: perspective(800px) rotateY(0); }\n  70% {\n    -moz-transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -moz-transform: perspective(800px) rotateY(180deg); } }\n\n@keyframes cd-rotate {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(0);\n    -moz-transform: perspective(800px) rotateY(0);\n    -ms-transform: perspective(800px) rotateY(0);\n    -o-transform: perspective(800px) rotateY(0);\n    transform: perspective(800px) rotateY(0); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(200deg);\n    -moz-transform: perspective(800px) rotateY(200deg);\n    -ms-transform: perspective(800px) rotateY(200deg);\n    -o-transform: perspective(800px) rotateY(200deg);\n    transform: perspective(800px) rotateY(200deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(180deg);\n    -moz-transform: perspective(800px) rotateY(180deg);\n    -ms-transform: perspective(800px) rotateY(180deg);\n    -o-transform: perspective(800px) rotateY(180deg);\n    transform: perspective(800px) rotateY(180deg); } }\n\n@-webkit-keyframes cd-rotate-inverse {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(0); } }\n\n@-moz-keyframes cd-rotate-inverse {\n  0% {\n    -moz-transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -moz-transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -moz-transform: perspective(800px) rotateY(0); } }\n\n@keyframes cd-rotate-inverse {\n  0% {\n    -webkit-transform: perspective(800px) rotateY(-180deg);\n    -moz-transform: perspective(800px) rotateY(-180deg);\n    -ms-transform: perspective(800px) rotateY(-180deg);\n    -o-transform: perspective(800px) rotateY(-180deg);\n    transform: perspective(800px) rotateY(-180deg); }\n  70% {\n    -webkit-transform: perspective(800px) rotateY(20deg);\n    -moz-transform: perspective(800px) rotateY(20deg);\n    -ms-transform: perspective(800px) rotateY(20deg);\n    -o-transform: perspective(800px) rotateY(20deg);\n    transform: perspective(800px) rotateY(20deg);\n    /* this creates the bounce effect */ }\n  100% {\n    -webkit-transform: perspective(800px) rotateY(0);\n    -moz-transform: perspective(800px) rotateY(0);\n    -ms-transform: perspective(800px) rotateY(0);\n    -o-transform: perspective(800px) rotateY(0);\n    transform: perspective(800px) rotateY(0); } }\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	var utils = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function() {
	    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
	        transform,
	        i = 0,
	        l = vendors.length;

	    for (; i < l; i++) {
	        transform = vendors[i] + 'ransform';
	        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
	    }

	    return false;
	})();

	function _prefixStyle(style, Joining) {
	    Joining = Joining || ''
	    if (_vendor === false) return false;
	    if (_vendor === '') return style;
	    return _vendor + Joining + style.charAt(0).toUpperCase() + style.substr(1);
	}

	utils.getTime = Date.now || function getTime() {
	    return new Date().getTime();
	};

	utils.extend = function(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	};

	utils.merge = function(dest, src) {
	    return utils.extend(dest, src, true);
	}

	utils.addEvent = function(el, type, fn, capture) {
	    el.addEventListener(type, fn, !!capture);
	};

	utils.removeEvent = function(el, type, fn, capture) {
	    el.removeEventListener(type, fn, !!capture);
	};

	var _transform = _prefixStyle('transform');

	utils.extend(utils, {
	    hasTransform: _transform !== false,
	    hasPerspective: _prefixStyle('perspective') in _elementStyle,
	    hasTouch: 'ontouchstart' in window,
	    hasPointer: navigator.msPointerEnabled,
	    hasTransition: _prefixStyle('transition') in _elementStyle
	});
	utils.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

	utils.extend(utils.style = {}, {
	    transform                : _transform,
	    transitionTimingFunction : _prefixStyle('transitionTimingFunction'),
	    transitionDuration       : _prefixStyle('transitionDuration'),
	    transitionDelay          : _prefixStyle('transitionDelay'),
	    transformOrigin          : _prefixStyle('transformOrigin')
	});

	utils.hasClass = function(e, c) {
	    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
	    return re.test(e.className);
	};

	utils.addClass = function(e, c) {
	    if (utils.hasClass(e, c)) {
	        return;
	    }
	    var newclass = e.className.split(' ');
	    newclass.push(c);
	    e.className = newclass.join(' ');
	};

	utils.removeClass = function(e, c) {
	    if (!utils.hasClass(e, c)) {
	        return;
	    }
	    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
	    e.className = e.className.replace(re, ' ');
	};

	utils.format = function(content) {
	    var args = [].slice.call(arguments, 1, arguments.length);
	    return content.replace(/\{(\d+)\}/g, function(m, i) {
	        return args[i];
	    });
	}


	var TRANSITION_END = 'transitionend';
	var ANIMATION_END = 'animationend';
	var KEYFRAMES = '@keyframes ';

	(function() {
	    var vendors = _prefixStyle('animation', '-');
	    var TRANSITION_END_NAMES = {
	        "moz"    : "transitionend",
	        "webkit" : "webkitTransitionEnd",
	        "ms"     : "MSTransitionEnd",
	        "o"      : "oTransitionEnd"
	    };
	    var ANIMATION_END_NAMES = {
	        "moz"    : "animationend",
	        "webkit" : "webkitAnimationEnd",
	        "ms"     : "MSAnimationEnd",
	        "o"      : "oAnimationEnd"
	    };
	    if (!vendors) return;
	    vendors = vendors.split('-');
	    if (!vendors[1]) return;
	    TRANSITION_END = TRANSITION_END_NAMES[vendors[0]];
	    ANIMATION_END = ANIMATION_END_NAMES[vendors[0]];
	    KEYFRAMES = '@-' + vendors[1] + '-keyframes ';
	})();

	utils.extend(utils.style, {
	    keyframes     : KEYFRAMES,
	    animationend  : ANIMATION_END,
	    transitionend : TRANSITION_END
	})
	    
	utils.extend(utils.event = utils.event || {}, {
	    start  : utils.hasTouch ? 'touchstart' : 'mousedown',
	    move   : utils.hasTouch ? 'touchmove' : 'mousemove',
	    end    : utils.hasTouch ? 'touchend' : 'mouseup',
	    cancel : utils.hasTouch ? 'touchcancel' : 'mouseup'
	})

	module.exports = utils;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	var utils    = __webpack_require__(8); 
	var config   = __webpack_require__(10);
	var depend   = __webpack_require__(11);
	var Observer = __webpack_require__(12);

	/**
	 * 初始化数据
	 */
	exports._init = function(element,options) {
	    
	    //页面容器
	    var $container = this.$container = $(element);
	    options        = this.options = utils.merge(options || {}, config);

	    //区域尺寸
	    this.contentWidth  = parseInt($container.css('width'))
	    this.contentHeight = parseInt($container.css('Height'))

	    //布局的原始排序
		this.originalOrder = depend.nature(options.level.row, options.level.col);

	    if (options.random) {
	        //新是随机排序
	        this.randomOrder = depend.random(this.originalOrder, options.random);
	    } else {
	        this.randomOrder = this.originalOrder;
	    }

	 
	    //收集回调
	    this.trackAnims = {
	        filter      : [], //过滤的元素合集
	        cache       : [], //一个元素动画2次回调处理
	        elems       : [], //触发的元素
	        triggerTime : [], //手动触发
	        times       : 0, //完成次数
	        total       : options.level.row * options.level.col //总数
	    };

	    this.observer = new Observer();

	    //开始构建
	    this._initCreate();

	    //构建事件
	    this._initEvent();
	}
	 

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * 默认配置文件
	 * @type {Object}
	 */
	module.exports = {

	    level: {
	        col: 2,
	        row: 3
	    },

	    //图片
	    images: {
	        //正面图
	        front: "images/front.jpg",
	        //背景图,随机分配
	        back: ["images/back1.jpg", "images/back2.jpg", "images/back3.jpg"]
	    },

	    //图片之间的间距,单位PX
	    gap:{
	        left : 10,
	        top  : 30
	    },

	    //随机
	    //0 不随机
	    //1 上下随机
	    //2 一顿乱搞
	    random: 2

	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	
	var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

	/**
	 * 原始布局
	 * @return {[type]} [description]
	 */
	exports.nature = function(row, col) {
	    var order = [];
	    var i;
	    var j;
	    for (i = 0; i < col; i++) {
	        for (j = 0; j < row; j++) {
	            if (!order[i]) {
	                order[i] = [];
	            }
	            order[i].push(j)
	        }
	    }
	    return order;
	}

	/**
	 * 根据长度随机
	 * @param  {[type]} len [description]
	 * @return {[type]}     [description]
	 */
	function calculate(len) {
	   return Math.floor(Math.random() * len);
	}

	/**
	 * 数组随机
	 * @param  {[type]} num [description]
	 * @return {[type]}     [description]
	 */
	function arrRandom(arr) {
	    arr.sort(function() {
	        return Math.random() > 0.5 ? -1 : 1;
	    })
	    return arr;
	}

	/**
	 * 上下算法
	 * @return {[type]} [description]
	 */
	function upToDown(randomOrder, originalOrder) {
	    var beforeOrder;
	    var order;
	    for (var i = 0, len = originalOrder.length; i < len; i++) {
	        randomOrder[i] = [];
	        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
	            //随机数
	            order = calculate(orderLen);
	            //去重,保证唯一
	            if (randomOrder[i].length > 0) {
	                while (jQuery.inArray(order, randomOrder[i]) > -1) {
	                    order = calculate(orderLen)
	                }
	            }
	            randomOrder[i].push(order);
	        }
	    }
	    for (i = 0; i < randomOrder.length; i++) {
	        order = randomOrder[i];
	        if (beforeOrder) {
	            //保证不一致
	            if (order.toString() == beforeOrder.toString()) {
	                return upToDown(originalOrder, randomOrder)
	            }
	        }
	        beforeOrder = order;
	    }
	}



	/**
	 * 完全随机
	 * @return {[type]} [description]
	 */
	function completelyRandom(originalOrder,randomOrder){
	    var arr = []
	    //取出原始数
	    for (var i = 0, len = originalOrder.length; i < len; i++) {
	        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
	            arr.push(originalOrder[i][j])
	        }
	    }
	    //随机一次
	    arrRandom(arr)

	    //合并到randomOrder
	    for (i = 0, len = originalOrder.length; i < len; i++) {
	        randomOrder[i] = [];
	        for (var j = 0, orderLen = originalOrder[i].length; j < orderLen; j++) {
	            randomOrder[i].push(arr[j + (i * orderLen)])
	        }
	    }
	}


	//随机算法
	exports.random = function(originalOrder, algorithm) {
	    var randomOrder = [];
	    switch (algorithm) {
	        case 1:
	            upToDown(originalOrder, randomOrder)
	            break
	        case 2:
	            completelyRandom(originalOrder, randomOrder)
	            break;
	    }
	    return randomOrder;
	}


	//找到容器ul
	exports.findContainer = function(event, appoint) {
	    var elem, elementName;
	    if (elem = event.target) {
	        //指定元素
	        if (appoint && appoint != elem.nodeName.toLowerCase()) {
	            return;
	        }
	        while ((elem = elem['parentNode']) && elem.nodeType !== 9) {
	            if (elem.nodeType === 1) {
	                elementName = elem.nodeName.toLowerCase();
	                if (elementName == 'ul') {
	                    return elem;
	                }
	            }
	        }
	    }
	}

	exports.pushArray = function(obj, key, fn) {
	    if (!obj[key]) {
	        obj[key] = [];
	    }
	    fn(obj[key])
	}

	var once = false;
	exports._bind = function() {
	    this.$container.on('mousedown touchstart', function() {
	        this.$container.off('mousedown touchstart')
	        this.triggerClick(event)
	        console.log(1)
	        return false;
	    }.bind(this))

	    if (!once) {
	        once = true;
	        this.$container.on(animationend, function(event) {
	            this.animCallback(event);
	            return false;
	        }.bind(this));
	    }
	}





/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * 触发器
	 * @return {[type]} [description]
	 */

	function Observer(ctx) {
	    this._ctx = ctx || this
	}

	var o = Observer.prototype

	o.on = function(event, fn) {
	    this._callback = this._callback || {};
	    (this._callback[event] = this._callback[event] || [])
	    .push(fn)
	    return this
	}

	o.once = function(event, fn) {
	    var self = this
	    this._callback = this._callback || {}

	    function on() {
	        self.off(event, on)
	        fn.apply(this, arguments)
	    }

	    on.fn = fn
	    this.on(event, on)
	    return this
	}

	/**
	 * 检测对应事件是否存在
	 * @return {[type]} [description]
	 */
	o.checkExists = function(event) {
	    return this._callback[event]
	}

	o.off = function(event, fn) {
	    this._callback = this._callback || {}

	    // all
	    if (!arguments.length) {
	        this._callback = {}
	        return this
	    }

	    // specific event
	    var callbacks = this._callback[event]
	    if (!callbacks) return this

	    // remove all handlers
	    if (arguments.length === 1) {
	        delete this._callback[event]
	        return this
	    }

	    // remove specific handler
	    var cb
	    for (var i = 0; i < callbacks.length; i++) {
	        cb = callbacks[i]
	        if (cb === fn || cb.fn === fn) {
	            callbacks.splice(i, 1)
	            break
	        }
	    }
	    return this
	}

	o.notify = function(event, a, b, c, d) {
	    this._callback = this._callback || {}
	    var callbacks = this._callback[event]
	    if (callbacks) {
	        callbacks = callbacks.slice(0)
	        for (var i = 0, len = callbacks.length; i < len; i++) {
	            callbacks[i].call(this._ctx, a, b, c, d)
	        }
	    }

	    return this
	}

	module.exports = Observer




/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	var utils = __webpack_require__(8);
	var depend = __webpack_require__(11);
	/**
	 * 动态布局
	 */
	 
	exports._initCreate = function() {
	    var level = this.options.level;
	    this.debrisWidth = this.contentWidth / level.row;
	    this.debrisHeight = this.contentHeight / level.col;
	    this._initLayer();
	}
		

	exports._initLayer = function() {
	    var index;
	    var $ul;
	    var $li;
	    var uls = [];
	    var debrisWidth   = this.debrisWidth;
	    var debrisHeight  = this.debrisHeight;
	    var options       = this.options;
	    var level         = options.level
	    var row           = level.row;
	    var col           = level.col;
	    var images        = options.images;
	    var randomOrder   = this.randomOrder;
	    var contentHeight = this.contentHeight;


	    var createStr = function(i, j) {
	        var width  = options.gap.left;
	        var height = options.gap.top;
	        var top    = height/2;
	        var innerdiv = function() {
	            return utils.format(
	                '<ul data-col={0} data-row={1} class="cd-item-wrapper" style="position:relative;width:{2}px;height:{3}px;margin:0 auto;margin-top:{4}px;">' +
		               	'<li data-type="front" class="is-visible"> ' +
		                	'<img src="{5}" width="{7}" height="{8}">' +
		                '</li>' +
		                '<li data-type="back" class="is-hidden">' +
		                	'<img src="{6}" width="{7}" height="{8}">' +
		                '</li>' +
	                '</ul>',
	                i, j,
	                debrisWidth-width,
	                debrisHeight-height,
	                top,

	                images.front,
	                images.back[randomOrder[i][j]],

	                debrisWidth-width,
	                debrisHeight-height
	            )
	        }
	        var str = utils.format(
	            '<li style="' +
	            'width:{0}px;' +
	            'height:{1}px;' +
	            'left:{2}px;' +
	            'position:absolute;' +
	            '">' + innerdiv() +
	            '</li>',
	            debrisWidth,
	            debrisHeight,
	            j * debrisWidth
	        )
	        return $(str)
	    }

	    //生成 row * col 的矩阵
	    for (var i = 0; i < col; i++) {
	        $ul = $(document.createElement('ul')).css({
	            'width': this.contentWidth,
	            'height': debrisHeight,
	            'overflow': 'hidden', //1111111
	            'position': 'relative' //1111111
	        });
	        //增加样式
	        $ul.addClass('cd-gallery cd-container')
	        for (var j = 0; j < row; j++) {
	            $li = createStr(i, j);
	            $ul.append($li)
	            depend.pushArray(this.originalOrder, i, function(arr) {
	                arr.push(j);
	            })
	        }
	        uls.push($ul)
	    }
	    var $fragment = $(document.createElement('createDocumentFragment'));
	    $.each(uls, function(index, ul) {
	        $fragment.append(ul)
	    })
	    this.$container.append($fragment[0].childNodes);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 冒泡事件
	 */
	var depend = __webpack_require__(11);
	var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';


	exports._initEvent = function() {
		this.$container.on('mousedown touchstart', function() {
			this.triggerClick(event)
			return false;
		}.bind(this))

		this.$container.on(animationend, function(event) {
			this.animCallback(event);
			return false;
		}.bind(this));
		// depend._bind.call(this);
	}
	 

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var depend = __webpack_require__(11);
	var utils = __webpack_require__(8);

	/**
	 * 手动触发
	 */
	exports.getPos = function(element) {
	    return {
	        'col': parseInt(element.getAttribute('data-col')),
	        'row': parseInt(element.getAttribute('data-row'))
	    }
	}

	exports.runAnim = function(element, status) {
	    var $element = $(element)
	    $element.find('.is-hidden').addClass('is-selected')
	    $element.addClass('is-switched');
	    if (status) {
	        //给每一个li ->anim  增加状态
	        var $children = $element.children();
	        $children.each(function(i, elem) {
	            elem.setAttribute('data-status', status)
	        })
	    }
	}

	/**
	 * 去重复
	 * @param  {[type]} element     [description]
	 * @param  {[type]} collections [description]
	 * @return {[type]}             [description]
	 */
	function toRepeat(element,collections) {
	    return -1 !== collections.indexOf(element) ? true :false;
	}

	exports.triggerClick = function(event) {
	    var element;
	    if (element = depend.findContainer(event, 'img')) {
	        //如果有重复元素
	        if (toRepeat(element,this.trackAnims.elems)) {
	            return
	        }
	        //最多2个同时点击，并且不是重复
	        //或者是禁止点击的元素了(动画结束了)
	        if (this.trackAnims.elems.length > 1
	            || element.getAttribute('data-status') === 'close') { //已完成动画
	            return
	        }
	        this.trackAnims.elems.push(element);
	        this.runAnim(element);
	    }
	}



/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 动画回调处理
	 */

	var depend = __webpack_require__(11);
	var utils  = __webpack_require__(8);

	/**
	 * 检测回调的唯一性
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	var checkUnique = function(event) {
	    var ul = depend.findContainer(event);
	    var index = this.trackAnims.cache.indexOf(ul);
	    if (~index) {
	        this.trackAnims.cache.splice(index, 1)
	        return false;
	    }
	    this.trackAnims.cache.push(ul);
	    return true;
	}

	/**
	 * 状态值
	 * @type {Object}
	 */
	var stateValue = {
	    'back'  :'front',
	    'front' :'back'
	};


	/**
	 * 重设新的状态
	 * @return {[type]} [description]
	 */
	var restoreState = function(elem,filter){
	    //重设值的状态
	    elem[0].setAttribute('data-type' , stateValue[filter])
	}

	/**
	 * 恢复属性
	 * @param  {[type]} context [description]
	 * @param  {[type]} parent  [description]
	 * @param  {[type]} filter  [description]
	 * @return {[type]}         [description]
	 */
	var restoreProperties = function(elem, parent, filter) {
	    var related = {
	        front: function() {
	            elem.removeClass('is-visible is-selected').addClass('is-hidden');
	        },
	        back: function() {
	            elem.addClass('is-visible').removeClass('is-hidden is-selected');
	        }
	    }
	    related[filter]();
	    parent.removeClass('is-switched')
	    //设置状态值
	    restoreState(elem,filter);
	}


	/**
	 * 动画回调
	 * @param  {[type]} event [description]
	 * @return {[type]}       [description]
	 */
	var autoRestoreAmount = 4;
	exports.animCallback = function(event) {
	    var ul,
	        $ul,
	        pos,
	        elem,
	        $elem,
	        elems,
	        level,
	        index,
	        filter,
	        parent,
	        $parent;

	    level   = this.options.level;
	    elem    = event.target;
	    parent  = depend.findContainer(event)
	    $elem   = $(elem);
	    $parent = $(parent);


	    //////////////////////////////////
	    ///
	    ///  自动动画：
	    ///     比较动画后，不一致自动还原
	    ///     
	    ///===============================
	    var status = elem.getAttribute('data-status');
	    if (status === 'autoRestore') {
	        elem.removeAttribute('data-status');
	        filter = elem.getAttribute('data-type')
	        restoreProperties($elem,$parent,filter);
	        //最后一个动画
	        if (1 === autoRestoreAmount) {
	            this.trackAnims.elems.length = 0;
	            this.observer.notify('change:fail');
	            autoRestoreAmount = 4;
	            return
	        }
	        --autoRestoreAmount;
	        return;
	    }

	    //处理动画元素
	    ///  过滤：
	    ///  1 每个元素动画的2个li回调
	    ///  2 每col都运行了动画
	    //每个li元素都会执行
	    filter = elem.getAttribute('data-type')
	    restoreProperties($elem, $parent, filter)

	    //保证只回调一次
	    //每一组动画回调一次
	    if (checkUnique.call(this, event)) {
	        return false;
	    }
	    $parent.attr('data-status', 'close');


	    //合并2个组动画
	    this.trackAnims.triggerTime.push(elem)
	    if (this.trackAnims.triggerTime.length !== level.col) {
	        return;
	    }
	    this.trackAnims.triggerTime.length = 0;


	    ////////////
	    //成功与失败处理 //
	    ////////////
	    var i;
	    var self = this;
	    //得到正确索引
	    var standardElement;
	    //动作
	    var succeed = true;
	    //获取定位坐标
	    var getIndex = function(element) {
	        var pos = self.getPos(element);
	        return self.randomOrder[pos.col][pos.row];
	    };

	    //运行动画的元素
	    elems = this.trackAnims.elems;

	    //取出第一个对比值
	    standardElement = elems[0];
	    index = getIndex(standardElement)
	    for (i = 1; i < elems.length; i++) {
	        elem = elems[i];
	        if (index != getIndex(elem)) {
	            succeed = false;
	            break;
	        }
	    }

	    if (succeed) {
	        elems.forEach(function(elem) {
	            //完成
	            $(elem)
	                .attr('data-status', 'close')
	                .css({
	                    'transition-delay': '100ms',
	                    'transition-duration': '1000ms',
	                    'opacity': 0
	                }).on(utils.style.transitionend, function() {
	                    //全部完成
	                    if (self.trackAnims.times === self.trackAnims.total) {
	                        self.observer.notify('change:complete');
	                    }
	                })
	        })
	        this.trackAnims.times += elems.length;
	        this.trackAnims.elems.length = 0;
	        this.observer.notify('change:success');
	    } else { //失败
	        elems.forEach(function(elem, index) {
	            elem.removeAttribute('data-status')
	            self.runAnim(elem, 'autoRestore')
	        })  
	    }
	}
	 

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * 销毁
	 * @return {[type]} [description]
	 */
	exports.destroy = function() {
		this.$container.off();
		this.observer.off();
		this.$container.empty();
		this.$container = null;
	}

/***/ }
/******/ ]);