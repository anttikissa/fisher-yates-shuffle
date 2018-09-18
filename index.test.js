let shuffle = require('./index')

// Produce the array of numbers [0, 1, ..., n]
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

