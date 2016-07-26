(function(win, doc) {
    var h;
    win.addEventListener('resize', function() {
        clearTimeout(h);
        h = setTimeout(setUnitA, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(h);
            h = setTimeout(setUnitA, 300);
        }
    }, false);
    var setUnitA = function() {
        doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 16 + 'px';
    };
    setUnitA();
})(window, document)
