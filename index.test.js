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

test('length of the resulting array is same', () => {
	times(10, () => {
		let r = range(5)
		let shuffled = shuffle(r)
		console.log(range(5))
	})
})

