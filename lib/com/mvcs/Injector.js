/*
 * Context
 */
var Context = function() {
	var _ = Context.prototype;
	_.commandMap = new CommandMap();
	_.viewMap = new ViewMap();
	_.injector = new Injector();
	_.startup = function() {
	};
	_.shutdown = function() {

	}
	
};
/*
 * View
 */
var View = function()
{
	var _ = View.prototype;
	_.elem = document.createElement("div");
	_.build=function()
	{
		
	}
	_.arrange=function()
	{
		
	}
	_.show=function()
	{
		this.elem.style.display="block";
	}
	_.hide=function()
	{
		this.elem.style.display="none";
	}
};
/*
 *Command
 */
var Command = function() {
	var _ = Command.prototype;
	_.execute = function() {
		
	};
	_.destroy=function()
	{
		dispatch(Event.Command_COMPLETE,this);
	};
};
/*
 * CommandMap
 */
var CommandMap = function() {
	var events = [];
	var commands = [];
	var par =this;
	this.mapEvent = function(eventType, commandClass, eventClass, oneshot) {
		events[eventType] = commandClass;
		this.addContextListener(eventType, function(e){par.onEvent(e)});
	};
	this.execute = function(commandClass) {

	};
	this.hasEventCommand = function(eventType, commandClass, eventClass) {

	};
	this.unmapEvent = function(eventType, commandClass, eventClass) {

	};
	this.unmapEvents = function() {

	};
	this.onEvent = function(event) {
		if(events && events[event.type]) {
			var command = new events[event.type]();
			commands.push(command);
			command.addContextListener(Event.Command_COMPLETE, par.onDestroyCommand);
			command.execute();
		}
	}
	this.onDestroyCommand=function(event)
	{
		for(var a=0;a<commands.length;a++)
		{
			if(event.target == commands[a])
			{
				var command = commands[a];
				command.removeContextListener(Event.Command_COMPLETE, par.onDestroyCommand);
				command=null;
				//commands.splice(a,1);
				a = commands.length;
				console.log("onDestroyCommand");
			}
		}
		
	}
};
/*
 * ViewMap
 */
var ViewMap = function() {
	var views = [];
	this.mapType = function(view) {
		views.push(view);
	}
}
/*
 * Injector
 */
var Injector = function() {
	if(!window.singletons)
		window.singletons = [];
	var singletons = window.singletons;
	this.mapSingleton = function(s) {
		singletons.push(new s());
	};
	this.getInstance = function(s) {
		for(var a = 0; a < singletons.length; a++) {
			if(singletons[a] instanceof  s)
				return singletons[a];
		}
		return null;
	};
};

var Events=
	{
		Command_COMPLETE:"Command_COMPLETE"
	};
/*
 *Object listeners
 */

Object.prototype.listeners = {};
Object.prototype.addContextListener = function(type, callback, scope) {
	var args = [];
	var numOfArgs = arguments.length;
	for(var i = 0; i < numOfArgs; i++) {
		args.push(arguments[i]);
	}
	args = args.length > 3 ? args.splice(3, args.length - 1) : [];
	if( typeof this.listeners[type] != "undefined") {
		this.listeners[type].push({
			scope : scope,
			callback : callback,
			args : args
		});
	} else {
		this.listeners[type] = [{
			scope : scope,
			callback : callback,
			args : args
		}];
	}
};
Object.prototype.removeContextListener = function(type, callback, scope) {
	if( typeof this.listeners[type] != "undefined") {
		var numOfCallbacks = this.listeners[type].length;
		var newArray = [];
		for(var i = 0; i < numOfCallbacks; i++) {
			var listener = this.listeners[type][i];
			if(listener.scope == scope && listener.callback == callback) {

			} else {
				newArray.push(listener);
			}
		}
		this.listeners[type] = newArray;
	}
};
Object.prototype.dispatch = function(type, target) {
	var numOfListeners = 0;
	var event = {
		type : type,
		target : target
	};
	var args = [];
	var numOfArgs = arguments.length;
	for(var i = 0; i < numOfArgs; i++) {
		args.push(arguments[i]);
	};
	args = args.length > 2 ? args.splice(2, args.length - 1) : [];
	args = [event].concat(args);
	if( typeof this.listeners[type] != "undefined") {
		var numOfCallbacks = this.listeners[type].length;
		for(var i = 0; i < numOfCallbacks; i++) {
			var listener = this.listeners[type][i];
			if(listener && listener.callback) {
				listener.args = args.concat(listener.args);
				listener.callback.apply(listener.scope, listener.args);
				numOfListeners += 1;
			}
		}
	}
};
Object.prototype.getEvents = function() {
	var str = "";
	for(var type in this.listeners) {
		var numOfCallbacks = this.listeners[type].length;
		for(var i = 0; i < numOfCallbacks; i++) {
			var listener = this.listeners[type][i];
			str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
			str += " listen for '" + type + "'\n";
		}
	}
	return str;
};
/*
 * Global
 */
window.Inject = function(c, s, name) {
	if(!window.singletons)
		return;
	for(var a = 0; a < window.singletons.length; a++) {
		if(singletons[a] instanceof  s) {
			c[name] = window.singletons[a];
		}
	}
};
window.extend = function(ChildClass, ParentClass) {
	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
};
