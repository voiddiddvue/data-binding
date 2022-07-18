
function DataBinder(object_id){
	let pubSub = {

		callbacks:{},

		on:function(msg,callback){
			if(!this.callbacks[msg]) this.callbacks[msg] = [];
			this.callbacks[msg].push(callback);
		},

		publish:function(msg){
			let functionList = this.callbacks[msg];
			if(!functionList) return;
			functionList.forEach(f => {
				f.apply(this,arguments);
			})
		}

	}

	let key = 'bind-' + object_id;
	let msg = 'change:' + object_id;

	document.addEventListener('input',event =>{
		let tgt = event.target;
		let prop_name = tgt.getAttribute(key);
		if(prop_name && prop_name!='')
			//prop_name表示绑定object_id对象的哪个属性
			pubSub.publish(msg,prop_name,tgt.value);
	})

	pubSub.on(msg,(_,prop_name,new_val) => {
		let doms = document.querySelectorAll("[" + key + "=" + prop_name + "]"),tag_name;
		for(let dom of doms)
		{
			tag_name = dom.tagName.toLowerCase();
			if(tag_name == 'select' || tag_name == 'input' || tag_name == 'textarea')
				dom.value = new_val;
			else
				dom.innerHTML = new_val;
		}
	})

	return pubSub;
}
