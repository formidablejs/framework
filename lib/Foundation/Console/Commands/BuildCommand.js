Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Helpersφ = require('../../../Support/Helpers'/*$path$*/);
var _$Commandφ = require('../Command'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$consoleφ = require('@formidablejs/console'/*$path$*/);
var _$child_processφ = require('child_process'/*$path$*/);

class BuildCommand extends _$Commandφ.Command {
	
	
	get signature(){
		
		return 'build {?--minify} {?--no-minify} {?--no-sourcemap} {?--no-hashing} {?--silent}';
	}
	
	get description(){
		
		return 'Build Formidable application';
	}
	
	get props(){
		
		return {
			minify: _$consoleφ.Prop.boolean().alias('m').description('Minify generated files'),
			'no-minify': _$consoleφ.Prop.boolean().alias('M').description('Disable minifying'),
			'no-sourcemap': _$consoleφ.Prop.boolean().alias('S').description('Disable sourcemap'),
			'no-hashing': _$consoleφ.Prop.boolean().alias('H').description('Disable hashing'),
			silent: _$consoleφ.Prop.boolean().alias('s').default(false).description('Disable output')
		};
	}
	
	get compiler(){
		
		return _$pathφ.join(process.cwd(),'node_modules','.bin','imba');
	}
	
	/**
	@param {String[]} customArgs
	*/
	build(customArgs = []){
		
		let args = ['build'];
		
		if (customArgs.length === 0) {
			
			if (this.option('minify',false)) {
				
				args.push('--minify');
			};
			
			if (this.option('no-minify',false)) {
				
				args.push('--no-minify');
			};
			
			if (this.option('no-sourcemap',false)) {
				
				args.push('-S');
			};
			
			if (this.option('no-hashing',false)) {
				
				args.push('-H');
			};
		} else {
			
			args = customArgs;
		};
		
		return _$child_processφ.spawnSync(this.compiler,['build',...args,'--outdir=.formidable','--clean'],{
			stdio: (this.option('silent',true) !== true) ? 'inherit' : undefined,
			cwd: process.cwd()
		});
	}
	
	handle(){
		
		return this.build();
	}
};
exports.BuildCommand = BuildCommand;
