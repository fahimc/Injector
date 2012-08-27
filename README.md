Injector ![Injector JS MVCS](http://fahimchowdhury.com/github/image/injector-logo.png)
========



A Javascript MVCS Framework based on RobotLegs. Ability to Inject Singletons into Objects.

#Architecture  

![Injector JS MVCS](http://fahimchowdhury.com/github/image/Injector.jpg)  

#Framework  

##Extend an Object (Inheritance)

Once you create a Class you can extend it using the extend function. You create the base class first then create the extended class, now you call the extend function and pass in the new class followed by the base class. Example  below:

    extend(NewContext, Context);

##Inject - add a singleton to a Class

When you created your context and mapped your singletons (discussed later) you can use the Inject method to add a singleton to a class. This Inject function takes three parameters, the class, the Singleton and the variable name. Example below:

    Inject(this, Model, "model");

Access the new variable: this.model

##Context Listeners and Event Dispatcher

The framework binds the Object Class with new listeners and a event dispatcher. 

    Object.addContextListener(type, callback, scope);
    Object.removeContextListener(type, callback, scope);
    Object.dispatch(type, target) ;

##Creating the Context (Event Bus)

The Context is where you map the Commands and add singletons. 
Create a Class a add a function called startup then call this function. Within this function you need to do the mapping. outside of this Class you need to call the extend function and extend the Context Class. Example Below:

    var MainContext = function() {
			this.startup = function() {
				this.injector.mapSingleton(Model);
				this.commandMap.mapEvent("UPDATE_TEST", TestCommand);
				this.commandMap.mapEvent("SHOW_INTRO", ViewCommand);
			}
			this.startup();
		};
		extend(MainContext, Context);

##Mapping a Singleton

The Context has an injector object which has a ‘mapSingleton’ function. You pass in the Singleton Class and then you can use the Inject function to get the instance of it.

    this.injector.mapSingleton(Model);

Inject(this, Model, "model");

##Mapping a Command

The Context has a command mapper which has a ‘mapEvent’ funcrtion. You pass in the Event name and the Command Class. 

    this.commandMap.mapEvent("SHOW_INTRO", ViewCommand);

To call a Command you need to dispatch the event.

    myClass.dispatch("SHOW_INTRO");

##Creating a Command

To create a Command you need to extend the Command Class. Create a Class and add a function called ‘execute’. In this function you can add your command code. This function gets called once the Command is created. When you’ve finished with the command you need to call the ‘destroy’ function. This will destroy this instance of the command.

    var ViewCommand = function() {
     this.execute = function() {
		// do something	
		this.destroy();
	};
};
extend(ViewCommand, Command);

##Creating a View

The View Class has a ‘build’ function which you can create all the children. The ‘arrange’ function is where you arrange the children. ‘hide’ and ‘show’ is used to hide or show the view. The view has a document div object call ‘elem’ this should be used to add all the children and the you can use this to add the view to the DOM.

Create a Class and extend the View Class:

    var IntroView = function() {
			this.build=function()
			{
				this.elem.style.width =100+"px";
				this.elem.style.height =100+"px";
				this.elem.style.backgroundColor="#FF0000";
				this.elem.style.position=”absolute”;
			};
			this.arrange=function()
			{
				this.elem.style.left=”100px”;
				this.elem.style.top=”100px”;
			};
		}
		extend(IntroView, View);

    var introView = new IntroView();
    introView.build();
    introView.arrange();
    document.body.appendChild(introView.elem);



