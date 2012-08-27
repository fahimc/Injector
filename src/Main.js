(function(window) {
	function Main() {
		if(window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {

		var MainContext = function() {
			this.startup = function() {
				this.injector.mapSingleton(Model);
				this.commandMap.mapEvent("TestCommand", TestCommand);
				this.commandMap.mapEvent("SHOW_INTRO", ViewCommand);
			}
			this.startup();
		};
		extend(MainContext, Context);
		
		var context = new MainContext();
		
		context.dispatch("SHOW_INTRO");

		

	}

	Main();
})(window);
