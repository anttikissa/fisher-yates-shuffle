# Shuffle an array into a random order

I heard about Fisher-Yates shuffle yesterday (also known as Knuth
shuffle, despite the computerized version having been invented by
Richard Durstenfeld). I wrote this as a test to check if I can still
write the algorithm correctly, and secondly to see how the randomness of
shuffling algorithms could be tested.

# How to

	let shuffle = require('fisher-yeates-shuffle')
	shuffle([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	//   => [ 8, 1, 6, 3, 5, 7, 9, 4, 2 ]

# Test

The test file (index.test.js) runs a set of tests against the shuffle
function and also some common naive shuffle functions (that can result
in not-so-random distribution of results). It's statistical in nature,
so it's possible that the tests could break at any time. In that case,
run the tests again.

	yarn
	./test

# Read more at

https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
