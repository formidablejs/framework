function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$Configφ = requireDefault$__(require('./Config'/*$path$*/));
var _$knexφ = requireDefault$__(require('knex'/*$path$*/));
var _$knex_paginateφ = require('knex-paginate'/*$path$*/);

let knex = null;

try {
	
	knex = _$knexφ.default(_$Configφ.default.make());
	
	_$knex_paginateφ.attachPaginate();
} catch (φ) {
	
	knex = null;
};

exports.default = knex;
