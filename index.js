function shuffle(a, options = { inPlace: false }) {
	let result = options.inPlace ? a : [...a]
	return result
}

module.exports = shuffle

