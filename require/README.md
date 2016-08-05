aaronRequire
============

AMD/CommonJS 加载模式

注意，只是提供一种JS模块化的管理方案，并非跟requirejs一样，提供脚本依赖加载，所以代码只有不100多行，非常轻巧


    /*****************************************************
     *
     *             方式一：AMD
     *
     *******************************************************/
    
    define('a',function(){
        //执行代码
        return 'aaaaaaaaaa'
    });

    define('b',function(){
        //执行代码
        return 'bbbbbbbbbb'
    });


    define('c',['a','b'],function(a,b){
        console.log(a,b)
        //执行代码
        return 'ccccccccc'
    });


    require('c',function(c){
        console.log(c)
    })




    /*****************************************************
     *
     *              方式二：commonJS 
     *
     *******************************************************/
    
    define('a',function(){
        //执行代码
        return 'aaaaaaaaaa'
    });

    define('b',function(){
        //执行代码
        return 'bbbbbbbbbb'
    });

    define('c', function(require, exports, module) {
        var a = require('a')
        var b = require('b');
        console.log(a,b)
        //执行代码
        return 'ccccccccc'
    });

    require('c',function(c){
        console.log(c)
    })

    

    /*****************************************************
     *
     *              引入多个依赖加载
     *
     *******************************************************/

	//引入依赖加载
	require([
			'Config',
			'ScriptLoad',
			'PromptNotice',
			'ExecuteSql',
			'LocalStorage',
			'App'
		], function(aa) {

	})

    
    