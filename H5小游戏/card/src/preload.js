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
