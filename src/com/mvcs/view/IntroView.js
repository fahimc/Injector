var IntroView = function() {
			Inject(this, Model, "model");
			this.build=function()
			{
				this.elem.style.width =100+"px";
				this.elem.style.height =100+"px";
				this.elem.style.backgroundColor="#FF0000";
			}
		}
		extend(IntroView, View);