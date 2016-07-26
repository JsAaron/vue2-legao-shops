var input_num_html = '<div id="input_number">';
input_num_html += '<div>';
input_num_html += '<h1 onclick="input_act(\'1\');">1</h1>';
input_num_html += '<h1 onclick="input_act(\'4\');">4</h1>';
input_num_html += '<h1 onclick="input_act(\'7\');">7</h1>';
input_num_html += '<h1 onclick="input_act(\'.\');">.</h1>';
input_num_html += '</div><div>';
input_num_html += '<h1 onclick="input_act(\'2\');">2</h1>';
input_num_html += '<h1 onclick="input_act(\'5\');">5</h1>';
input_num_html += '<h1 onclick="input_act(\'8\');">8</h1>';
input_num_html += '<h1 onclick="input_act(\'0\');">0</h1>';
input_num_html += '</div><div>';
input_num_html += '<h1 onclick="input_act(\'3\');">3</h1>';
input_num_html += '<h1 onclick="input_act(\'6\');">6</h1>';
input_num_html += '<h1 onclick="input_act(\'9\');">9</h1>';
input_num_html += '<h3 onclick="hide_input();"></h3>';
input_num_html += '</div><div>';
input_num_html += '<h2 onclick="input_act(\'del\');"></h2>';
input_num_html += '<h4 onclick="hide_input();" id="input_ok">确定</h4>';
input_num_html += '</div></div><div id="input_mask" onclick="hide_input();"></div>';

//下面这种写法会导致 click 延迟300ms
//input_num_html += '<div>';
//input_num_html += '<h1>1</h1>';
//input_num_html += '<h1>4</h1>';
//input_num_html += '<h1>7</h1>';
//input_num_html += '<h1>.</h1>';
//input_num_html += '</div><div>';
//input_num_html += '<h1>2</h1>';
//input_num_html += '<h1>5</h1>';
//input_num_html += '<h1>8</h1>';
//input_num_html += '<h1>0</h1>';
//input_num_html += '</div><div>';
//input_num_html += '<h1>3</h1>';
//input_num_html += '<h1>6</h1>';
//input_num_html += '<h1>9</h1>';
//input_num_html += '<h3></h3>';
//input_num_html += '</div><div>';
//input_num_html += '<h2 onclick="input_act(\'del\');"></h2>';
//input_num_html += '<h4 onclick="hide_input();" id="input_ok">确定</h4>';
//input_num_html += '</div></div><div id="input_mask" onclick="hide_input();"></div>';
var input_num_obj = null;
		
function hide_input(){
	input_num_obj = null;
	$('#input_mask').fadeOut();
	$('#input_number').slideUp(500);
}

function show_input(){
	$('#input_mask').fadeTo(500, 0.2);
	$('#input_number').slideDown(500);
	$('body').scrollTop(200 + 30 - ($(document.body).outerHeight(true) - $(input_num_obj).offset().top));
}

function init_input(){
	$("body").append(input_num_html);
//下面这种写法会导致 click 延迟300ms
//	$("#input_number h1").each(function() {
//		$(this).attr('tapmode' , 'focus');
//		$(this).click(function() {
//			input_act($(this).text());
//		});
//	});
	$("#input_number h1 , #input_number h2 , #input_number h3 , #input_number h4").each(function() {
		$(this).attr('tapmode' , 'focus');
	});
//	api.parseTapmode();
}

function ok_input_box(obj){
	if($(input_num_obj).text() == ''){
		$('#input_ok').attr('class' , '');
	}else{
		$('#input_ok').attr('class' , 'p_4');
	}
}

function this_input(obj){
	input_num_obj = obj;
	show_input();
	ok_input_box();
}

function input_act(type){
	var input_val_0 	= $(input_num_obj).text();
	var input_val_len 	= input_val_0.length;
	if(input_val_len < 13){//小于13个字符 以免爆掉 影响美观 可以自己定义 input div 的长度 适当调整
		var input_val 		= '';
		
		switch(type){
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				input_val = input_val_0 + type;
				break;
			case ".":
				if(input_val_len > 0){
					input_val = input_val_0;
					if(input_val_0.indexOf('.') == -1){
						input_val += type;
					}
				}
				break;
			case "del":
				if(input_val_len > 0){
					input_val = input_val_0.substr(0 , input_val_len - 1);
				}
//input_val = input_val_0 + type;
				break;
		}
		$(input_num_obj).text(input_val);
		ok_input_box();
	}
}