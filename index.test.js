let shuffle = require('./index')

// Produce the array of numbers [0, 1, ..., n - 1]
let range = (n) => Array(n).fill().map((x, idx) => idx)

// Call f() n times.
function times(n, f) {
	while (n--) {
		f();
	}
}

test('resulting object is not the same as the original', () => {
	let r = range(10)
	expect(shuffle(r)).not.toBe(r)
})

test('resulting object with inPlace: true is the same as the original', () => {
	let r = range(10)
	expect(shuffle(r, { inPlace: true })).toBe(r)
})

test('shuffled array has the same length', () => {
	times(10, () => {
		let r = range(5)
		let shuffled = shuffle(r)
		expect(shuffled.length).toBe(r.length)
	})
})

test('shuffled array has the same elements', () => {
	times(100, () => {
		let orig = range(1000)
		let shuffled = shuffle(orig)
		shuffled.sort((a, b) => a > b ? 1 : a < b ? -1 : 0)
		expect(orig).toEqual(shuffled)
	})
})

test('shuffled array does not equal original', () => {
	// This will fail about once in a 100000 times.
	times(10, () => {
		let r = range(100000)
		let shuffled = shuffle(r)
		expect(shuffled).not.toEqual(r)
	})
})

// One naive (and wrong) shuffling algorithm
function naiveShuffle(a) {
	let result = [...a]

	function random(n) {
		return Math.random() * n | 0
	}

	function swap(a, i, j) {
		let tmp = a[i]
		a[i] = a[j]
		a[j] = tmp
	}

	for (let i = 0; i < result.length; i++) {
		swap(result, i, random(result.length))
	}

	return result
}

// Another naive (and wrong) shuffling algorighm
function naiveShuffle2(a) {
	let result = [...a]

	return result.sort(() => Math.random())
}

// Shuffles a n times with f and returns an array of the results
// e.g. perms([1,2,3,4,5], 10, someShuffle)
// might return
//     { '102': 1, '120': 1, '201': 1, '210': 3, '012': 2, '021': 2 }
function perms(a, n, f) {
	let counts = {}

	times(n, () => {
		let shuffled = f(a)
		let id = shuffled.join('')
		if (counts[id]) {
			counts[id]++
		} else {
			counts[id] = 1
		}
	})
	return counts
}

function average(values) {
	let sum = values.reduce((a, b) => a + b, 0)
	let avg = sum / values.length
	return avg
}

// Calculates the standard deviation of values.
// Formula: sqrt(avg(|avg(values) - x| ^ 2 for x in values))
function stddev(values) {
	let avg = average(values)
	let sumOfDeviationsSquared = values.reduce((a, b) => {
		return a + (Math.abs(avg - b) ** 2)
	}, 0)
	let avgOfDeviationsSquared = sumOfDeviationsSquared / values.length
	return Math.sqrt(avgOfDeviationsSquared)
}

// Relative standard deviation of values. (AKA coefficient of variation)
// In our particular case, the average of counts is always positive, so
// this number is positive for our data as well.
function rds(values) {
	return Math.abs(stddev(values) / average(values))
}

test('RDS of amounts of different permutations is large with a naive algorithm', () => { // With naive shuffle, the result is usually something close to 0.17
	const MIN_RDS = 0.15
	let counts = perms(range(4), 100000, naiveShuffle)
	let relativeStandardDeviation = rds(Object.values(counts))
	if (relativeStandardDeviation < MIN_RDS) {
		console.log('RDS too low, results', counts)
	}

	expect(relativeStandardDeviation).toBeGreaterThanOrEqual(MIN_RDS)
})

test('RDS of amounts of different permutations is large with a naive algorithm 2', () => { // With naive shuffle, the result is usually something close to 0.17
	const MIN_RDS = 0.15
	let counts = perms(range(4), 100000, naiveShuffle)
	let relativeStandardDeviation = rds(Object.values(counts))
	if (relativeStandardDeviation < MIN_RDS) {
		console.log('RDS too low, results', counts)
	}

	expect(relativeStandardDeviation).toBeGreaterThanOrEqual(MIN_RDS)
})

test('shuffle should produce all permutations with enough iterations', () => {
	let PERM_COUNT = 4 * 3 * 2 * 1
	let counts = perms(range(4), 10000, shuffle)

	if (Object.values(counts).length !== PERM_COUNT) {
		console.log('Some permutations are missing', counts)
	}

	expect(Object.values(counts).length).toBe(PERM_COUNT)
})

test('RDS of amounts of different permutations is small enough', () => {
	// The relative standard deviation of amounts of shuffled values must not exceed this limit
	const MAX_RDS = 0.05
	let counts = perms(range(4), 100000, shuffle)
	let relativeStandardDeviation = rds(Object.values(counts))
	if (relativeStandardDeviation > MAX_RDS) {
		console.log('RDS too high, results', counts)
	}

	expect(relativeStandardDeviation).toBeLessThanOrEqual(MAX_RDS)
})

