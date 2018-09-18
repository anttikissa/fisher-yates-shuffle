function swap(a, i, j) {
	let tmp = a[i]
	a[i] = a[j]
	a[j] = tmp
}

function shuffle(a, options = { inPlace: false }) {
	let result = options.inPlace ? a : [...a]

	swap(result, 0, a.length - 1)
	return result
}

module.exports = shuffle

