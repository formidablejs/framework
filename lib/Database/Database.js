function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/

var $1 = require('knex-paginate'/*$path$*/);
var $2 = requireDefault$__(require('./Config'/*$path$*/));
var $3 = requireDefault$__(require('knex'/*$path$*/));

let Database = null;

try {
	
	/**@type {Knex}*/ /**@type {Knex}*/(Database) = $3.default($2.default.make());
	
	$1.attachPaginate();
} catch ($4) {
	
	/**@type {Knex}*/ /**@type {Knex}*/(Database) = null;
};

exports.default = Database;
