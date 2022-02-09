function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$hasAttrφ = requireDefault$__(require('./hasAttr'/*$path$*/));
var _$readPropsφ = requireDefault$__(require('./readProps'/*$path$*/));
var _$SPAServiceResolverφ = requireDefault$__(require('./SPAServiceResolver'/*$path$*/));

exports.hasAttr = _$hasAttrφ.default;
exports.readProps = _$readPropsφ.default;
exports.SPAServiceResolver = _$SPAServiceResolverφ.default;
