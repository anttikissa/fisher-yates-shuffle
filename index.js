function swap(a, i, j) {
	let tmp = a[i]
	a[i] = a[j]
	a[j] = tmp
}

// Returns an integer in [0, n[
function random(n) {
	return Math.random() * n | 0
}

function shuffle(a, options = { inPlace: false }) {
	let result = options.inPlace ? a : [...a]

	// Fisher-Yates-Knuth-etc in-place sorting algorithm
	for (let i = a.length - 1; i >= 0; i--) {
		let randomIndex = random(i + 1)
		swap(result, i, randomIndex)
	}
	return result
}

module.exports = shuffle

