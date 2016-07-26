
var utils = require('../utils');
var depend = require('./depend');
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
