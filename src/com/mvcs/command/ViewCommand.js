var ViewCommand = function() {
	Inject(this, Model, "model");
	this.execute = function() {
		var view = new IntroView();
		view.build();
		view.arrange();
		document.body.appendChild(view.elem);
		view.dispatch("TestCommand");
		
		console.log(view.model.name());
		
		this.destroy();
	};
};
extend(ViewCommand, Command);
