function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$knex_paginateφ = require('knex-paginate'/*$path$*/);
var _$Configφ = requireDefault$__(require('./Config'/*$path$*/));
var _$knexφ = requireDefault$__(require('knex'/*$path$*/));
let Database = null;

try {
	
	Database = _$knexφ.default(_$Configφ.default.make());
	
	_$knex_paginateφ.attachPaginate();
} catch (φ) {
	
	/**@type {Knex}*/ /**@type {Knex}*/(Database) = null;
};

exports.default = Database;
