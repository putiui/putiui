// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
		es6: true
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		"indent": ["error", 4],
		"no-new": 0,
		"no-new-func": 0,
		"eol-last": 0,
		"spaced-comment": 0,
		"eqeqeq": 0,
		"one-var": 0,
		"no-unneeded-ternary": 0,
		"space-before-function-paren": 0,
		"semi": 0,
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0
	}
}
