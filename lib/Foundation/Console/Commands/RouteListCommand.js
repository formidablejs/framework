function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : a; };
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('@formidablejs/console'/*$path$*/);
var $2 = require('@formidablejs/console'/*$path$*/);
class RouteListCommand extends $1.Command {
	
	
	get signature(){
		
		return 'route:list {--method}';
	}
	
	get description(){
		
		return 'List all registered routes';
	}
	
	get props(){
		
		return {
			method: $2.Prop.string().multiple().nullable().description('Filter the routes by method')
		};
	}
	
	// @returns {Application}
	get app(){
		
		return this.constructor.ctx;
	}
	
	handle(){
		
		const list = [];
		const methods = this.option('method') ? ((Array.isArray(this.option('method')) ? this.option('method') : [this.option('method')])) : ['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD','TRACE','CONNECT'];
		
		const routes = this.app.routes().filter(function(route) {
			
			return methods.map(function(method) { return method.toUpperCase(); }).includes(route.method.toUpperCase());
		});
		
		for (let route of iter$__(routes)){
			
			let color;
			
			if (route.method == 'post') {
				
				color = 'green';
			} else if (route.method == 'get') {
				
				color = 'blue';
			} else if (route.method == 'delete') {
				
				color = 'red';
			} else {
				
				color = 'green';
			};
			
			const path = ("<fg:" + color + ">" + route.method.toUpperCase() + "</fg:" + color + ">") + ' ' + (route.path.padStart((6 - route.method.length) + route.path.length,' '));
			const name = route.name || '';
			const action = Array.isArray(route.action) ? (("" + (route.action[0].name) + "@" + (route.action[1]))) : '';
			const description = (name != '' && action != '') ? (name + ' › ' + action) : (((name != '') ? name : ((action != '') ? action : '')));
			
			list.push(path + ' \x1b[2m' + ((description == '') ? '' : (' ' + description)).padStart((process.stdout.columns - path.length - 2) + (("<fg:" + color + ">").length * 2),"...") + '\x1b[0m');
		};
		
		return this.write(list.join("\n"));
	}
};
exports.RouteListCommand = RouteListCommand;


