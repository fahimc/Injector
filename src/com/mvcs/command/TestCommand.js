var TestCommand = function() {
	Inject(this, Model, "model");
	this.excute = function() {
		this.model.name("fahim");
		this.destroy();
	};
};
extend(TestCommand, Command);
