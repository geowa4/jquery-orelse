(function($) {
    var errorString = 
' requires at least on argument, and the first argument must be a function';
    $.fn.orElse = function(fallback) {
	if(arguments.length === 0 || typeof arguments[0] !== "function") {
	    $.error('orElse' + errorString);
	}
	if(this.size() === 0) {
	    var fallen = 
		fallback.apply(this, Array.prototype.slice.call(arguments, 1));
	}
	return fallen || this;
    }

    $.fn.getOrElse = function() {
	if(arguments.length === 0) {
	    $.error('getOrElse' + errorString);
	} else if(typeof arguments[0] !== "function") {
	    if(typeof arguments[0] === "number" && 
	       typeof arguments[1] === "function") {
		var index = arguments[0];
		var fallback = arguments[1];
	    } else {
		$.error('getOrElse' + errorString);
	    }
	}
	var elems = this.get(index);
	if(elems === undefined || elems.length === 0) {
	    var fallen = 
		fallback.apply(this, Array.prototype.slice.call(arguments, 2));
	}
	return fallen || elems;
    }
})(jQuery);