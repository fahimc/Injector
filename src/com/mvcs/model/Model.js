var Model = function() {
	var _name = "";
	this.name = function(value) {
		if(value) {
			_name = value;
		} else {
			return _name;
		}
	};
};
