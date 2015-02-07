

$(function() {

	var showInfo = $("#cnblogs_post_body");

	(function() {
		var body = showInfo;
		var hs = body.find('h1, h2');
		hs.append($('<a class="forTitles"></a>'));
		body.find("ul li").css('fontSize', '15px');
		var forTitles = body.find('.forTitles');

		if (forTitles.length < 1) return;

		//父li
		$.each(forTitles, function(i, item) {
			var el = $(this);
			var pEl = el.parent();
			var nodeName = pEl[0].tagName;
			if (nodeName == 'H1') {
				el.addClass('__h1');
				el.attr('name', '_h1_' + i);
			} else if (nodeName == 'H2') {
				el.addClass('__h2');
				el.attr('name', '_h2_' + i);
			}
		})

		//导航
		var menuAaron = $('<div class="menuAaron">')
		var menuset = $('<div id="menuset">' +
			'<a id="menuclose">隐藏导航</a>' +
			'<a id="menuopen" style="display:none">导航</a>' +
			'</div>');
		var list = $('<ul id="menumain"></ul>');

		var menuli = [];
		$.each(forTitles, function(i, item) {
			var el = $(this);
			var pEl = el.parent();
			pEl.before(el);
			var li = $('<li class="' + el.attr('class') + '"><a  href="#' + el.attr('name') + '" >' + (i + 1) + '.&nbsp' + pEl.text() + '</a>');
			menuli.push(li)
			list.append(li);
		});
		menuAaron.append(menuset);
		menuAaron.append(list);
		body.before(menuAaron);


		var offsetMenu = [];
		var preValue;
		$.each(forTitles, function(index, ele) {
			offsetMenu.push({
				i: index,
				value: $(ele).offset().top
			})
		})

		//滚动
		var preIndex,currIndex;
		function setMenu() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop < offsetMenu[0].value) {
				setli(0)
				return
			}
			if (scrollTop > offsetMenu[offsetMenu.length - 1].value) {
				setli(offsetMenu.length - 1)
				return
			}
			for (var i = 0; i < offsetMenu.length; i++) {
				var li = offsetMenu[i]
				var value = li.value;
				if (scrollTop > value && scrollTop < offsetMenu[i + 1].value) {
					setli(i)
				}
			}
		}

		function setli(index) {
			if(preIndex !== index && menuli[preIndex]){
				//移除上一个
				removeli(preIndex)
			}
			if(currIndex != index){
				menuli[index][0].firstChild.style.color = '#FF3300'
				currIndex = index
		    }
			preIndex = index;
		}

		function removeli(index) {
			menuli[index][0].firstChild.style.color = ''
		}

		$(window).scroll(function(event) {
			setMenu();
		});
		setMenu();
	})();


	(function($) {
		$.scrollUp = function(options) {
			var settings = {
				scrollName: 'scrollUp',
				topDistance: '300',
				topSpeed: 300,
				animation: 'fade',
				animationInSpeed: 200,
				animationOutSpeed: 200,
				scrollText: '回到顶部',
				activeOverlay: false
			};
			if (options) {
				var settings = $.extend(settings, options);
			}
			var sn = '#' + settings.scrollName,
				an = settings.animation,
				os = settings.animationOutSpeed,
				is = settings.animationInSpeed,
				td = settings.topDistance,
				st = settings.scrollText,
				ts = settings.topSpeed,
				ao = settings.activeOverlay;
			$('<a/>', {
				id: settings.scrollName,
				href: '#top',
				title: st
					/*text: st*/
			}).appendTo('body');
			$(sn).css({
				'display': 'none',
				'position': 'fixed',
				'z-index': '2147483647'
			})
			if (ao) {
				$("body").append("<div id='" + settings.scrollName + "-active'></div>");
				$(sn + "-active").css({
					'position': 'absolute',
					'top': td + 'px',
					'width': '100%',
					'border-top': '1px dotted ' + ao,
					'z-index': '2147483647'
				})
			}
			$(window).scroll(function() {
				if (an === "fade") {
					$(($(window).scrollTop() > td) ? $(sn).fadeIn(is) : $(sn).fadeOut(os));
				} else if (an === "slide") {
					$(($(window).scrollTop() > td) ? $(sn).slideDown(is) : $(sn).slideUp(os));
				} else {
					$(($(window).scrollTop() > td) ? $(sn).show(0) : $(sn).hide(0));
				}
			});
			$(sn).click(function(event) {
				$('html, body').animate({
					scrollTop: 0
				}, ts);
				return false;
			});
		};
	}(jQuery));

	$("#post-up").on("click", function() {
		$("#div_digg .diggit").click();
	})

	$.scrollUp();


	setTimeout(function() {
		///////////////
		//不能推荐自己的内容 //
		///////////////
		var diggit = $('.diggit')
		var onclick = diggit.attr('onclick');
		diggit.removeAttr("onclick")
		diggit.click(function() {
                        var digg_tips = $("#digg_tips").empty()
                        digg_tips.show();
                        (new Function("", "return " + onclick))()
			setTimeout(function() {
		            digg_tips.empty()
			}, 2000)
		})
	}, 1000)


	////////
	//导航 //
	////////
	$("#menuclose").click(function() {
		$("#menumain").hide();
		$(this).hide();
		$("#menuopen").show();
		$(".menuAaron").animate({
			'right': '-30'
		})
	})
	$("#menuopen").click(function() {
		$("#menumain").show()
		$(this).hide();
		$("#menuclose").show();
		$(".menuAaron").animate({
			'right': '20'
		})
	})


	//////////
	//删除随笔 //
	//////////
	setTimeout(function() {
		$(".catListTitle").each(function(index, ele) {
			if (/随笔档案/.test($(ele).text())) {
				$(ele).remove();
			}
		})
	}, 500)


	///////////
	//可执行代码 //
	///////////
	function runCode(cod1) {
		var cod = window.document.all(cod1)
		var code = cod.value;
		var newwin = window.document.open('', '', '');
		newwin.opener = null
		newwin.document.write(code);
		newwin.document.close();
	}


	showInfo.append('</br><div id="MySignature" style="display: block;">'+
		'<div id="MySignature_title">如果您看完本篇文章感觉不错，请点击一下右下角的'+
		'   <strong>'+
		'      <span style="color: #ff0000;">【<a id="post-up" href="javascript:void(0);">推荐</a>】</span>'+
		'   </strong>来支持一下博主，谢谢！'+
		'</div>');


	$("#blog-calendar").after('</br></br><h3 class="catListTitle">友情链接</h3>'+
		'<strong><div class="youqing"><a href="http://www.cnblogs.com/yexiaochai/">叶小钗</a></strong></br>'+
		'<strong><a href="http://www.cnblogs.com/jikey">豪情</a></strong></br>'+
		'<strong><a href="http://www.cnblogs.com/vajoy/">vajoy</a></strong></br>'+
		'<strong><a href="http://stylechen.com/">雨夜带刀</a></strong></br>'+
		'<strong><a href="http://www.cnblogs.com/hustskyking/">Barret Lee</a></strong></br>'+
		'</br>').after("</br><span style='color:red'>如果您觉得此文有帮助，可以打赏点钱给我支付宝chenwenkl@163.com<br/>或扫描二维码<span><br/><img src='http://images.cnblogs.com/cnblogs_com/aaronjs/642765/o_o_aex3ezbv03vx4nvq9e%20(1).png'>");


});














$(function() {

	var showInfo = $("#cnblogs_post_body");

	(function() {
		var body = showInfo;
		var hs = body.find('h1, h2');
		hs.append($('<a class="forTitles"></a>'));
		body.find("ul li").css('fontSize', '15px');
		var forTitles = body.find('.forTitles');

		if (forTitles.length < 1) return;

		//父li
		$.each(forTitles, function(i, item) {
			var el = $(this);
			var pEl = el.parent();
			var nodeName = pEl[0].tagName;
			if (nodeName == 'H1') {
				el.addClass('__h1');
				el.attr('name', '_h1_' + i);
			} else if (nodeName == 'H2') {
				el.addClass('__h2');
				el.attr('name', '_h2_' + i);
			}
		})

		//导航
		var menuAaron = $('<div class="menuAaron">')
		var menuset = $('<div id="menuset">' +
			'<a id="menuclose">隐藏导航</a>' +
			'<a id="menuopen" style="display:none">导航</a>' +
			'</div>');
		var list = $('<ul id="menumain"></ul>');

		var menuli = [];
		$.each(forTitles, function(i, item) {
			var el = $(this);
			var pEl = el.parent();
			pEl.before(el);
			var li = $('<li class="' + el.attr('class') + '"><a  href="#' + el.attr('name') + '" >' + (i + 1) + '.&nbsp' + pEl.text() + '</a>');
			menuli.push(li)
			list.append(li);
		});
		menuAaron.append(menuset);
		menuAaron.append(list);
		body.before(menuAaron);


		var offsetMenu = [];
		var preValue;
		$.each(forTitles, function(index, ele) {
			offsetMenu.push({
				i: index,
				value: $(ele).offset().top
			})
		})

		//滚动
		function setMenu() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop === 0) {
				setli(0)
				return;
			}
			if (scrollTop < offsetMenu[0].value) {
				setli(0)
				return
			}
			if (scrollTop > offsetMenu[offsetMenu.length - 1].value) {
				setli(offsetMenu.length - 1)
				removeli(offsetMenu.length - 2)
				return
			}
			for (var i = 0; i < offsetMenu.length; i++) {
				var li = offsetMenu[i]
				var value = li.value;
				if (scrollTop > value && scrollTop < offsetMenu[i + 1].value) {
					setli(i)
				} else {
					removeli(i)
				}
			}
		}

		function setli(index) {
			menuli[index][0].firstChild.style.color = '#FF3300'

		}

		function removeli(index) {
			menuli[index][0].firstChild.style.color = ''
		}

		$(window).scroll(function(event) {
			setMenu();
		});
		setMenu();
	})();


	(function($) {
		$.scrollUp = function(options) {
			var settings = {
				scrollName: 'scrollUp',
				topDistance: '300',
				topSpeed: 300,
				animation: 'fade',
				animationInSpeed: 200,
				animationOutSpeed: 200,
				scrollText: '回到顶部',
				activeOverlay: false
			};
			if (options) {
				var settings = $.extend(settings, options);
			}
			var sn = '#' + settings.scrollName,
				an = settings.animation,
				os = settings.animationOutSpeed,
				is = settings.animationInSpeed,
				td = settings.topDistance,
				st = settings.scrollText,
				ts = settings.topSpeed,
				ao = settings.activeOverlay;
			$('<a/>', {
				id: settings.scrollName,
				href: '#top',
				title: st
					/*text: st*/
			}).appendTo('body');
			$(sn).css({
				'display': 'none',
				'position': 'fixed',
				'z-index': '2147483647'
			})
			if (ao) {
				$("body").append("<div id='" + settings.scrollName + "-active'></div>");
				$(sn + "-active").css({
					'position': 'absolute',
					'top': td + 'px',
					'width': '100%',
					'border-top': '1px dotted ' + ao,
					'z-index': '2147483647'
				})
			}
			$(window).scroll(function() {
				if (an === "fade") {
					$(($(window).scrollTop() > td) ? $(sn).fadeIn(is) : $(sn).fadeOut(os));
				} else if (an === "slide") {
					$(($(window).scrollTop() > td) ? $(sn).slideDown(is) : $(sn).slideUp(os));
				} else {
					$(($(window).scrollTop() > td) ? $(sn).show(0) : $(sn).hide(0));
				}
			});
			$(sn).click(function(event) {
				$('html, body').animate({
					scrollTop: 0
				}, ts);
				return false;
			});
		};
	}(jQuery));

	$("#post-up").on("click", function() {
		$("#div_digg .diggit").click();
	})

	$.scrollUp();


	setTimeout(function() {
		///////////////
		//不能推荐自己的内容 //
		///////////////
		var diggit = $('.diggit')
		var onclick = diggit.attr('onclick');
		diggit.removeAttr("onclick")
		diggit.click(function() {
                        var digg_tips = $("#digg_tips").empty()
                        digg_tips.show();
                        (new Function("", "return " + onclick))()
			setTimeout(function() {
		            digg_tips.empty()
			}, 2000)
		})
	}, 1000)


	////////
	//导航 //
	////////
	$("#menuclose").click(function() {
		$("#menumain").hide();
		$(this).hide();
		$("#menuopen").show();
		$(".menuAaron").animate({
			'right': '-30'
		})
	})
	$("#menuopen").click(function() {
		$("#menumain").show()
		$(this).hide();
		$("#menuclose").show();
		$(".menuAaron").animate({
			'right': '20'
		})
	})


	//////////
	//删除随笔 //
	//////////
	setTimeout(function() {
		$(".catListTitle").each(function(index, ele) {
			if (/随笔档案/.test($(ele).text())) {
				$(ele).remove();
			}
		})
	}, 500)


	///////////
	//可执行代码 //
	///////////
	function runCode(cod1) {
		var cod = window.document.all(cod1)
		var code = cod.value;
		var newwin = window.document.open('', '', '');
		newwin.opener = null
		newwin.document.write(code);
		newwin.document.close();
	}


	showInfo.append('</br><div id="MySignature" style="display: block;"><div id="MySignature_title">如果您看完本篇文章感觉不错，请点击一下右下角的<strong><span style="color: #ff0000;">【<a id="post-up" href="javascript:void(0);">推荐</a>】</span></strong>来支持一下博主，谢谢！</div>');


	$("#blog-calendar").after('</br></br><h3 class="catListTitle">友情链接</h3><strong><div class="youqing"><a href="http://www.cnblogs.com/yexiaochai/">叶小钗</a></strong></br><strong><a href="http://www.cnblogs.com/jikey">豪情</a></strong></br><strong><a href="http://www.cnblogs.com/vajoy/">vajoy</a></strong></div></br></br>').after("</br><span style='color:red'>如果您觉得此文有帮助，可以打赏点钱给我支付宝chenwenkl@163.com<br/>或扫描二维码<span><br/><img src='http://images.cnblogs.com/cnblogs_com/aaronjs/642765/o_o_aex3ezbv03vx4nvq9e%20(1).png'>");


});
