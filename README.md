# shuffle - shuffle an array (JavaScript implementation)

Uses the [Fisher-Yates
shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) for
grandiosely random results.

# Usage (JS)

	yarn add @anttikissa/fisher-yates-shuffle

	let shuffle = require('fisher-yates-shuffle')
	shuffle([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	//   => [ 8, 1, 6, 3, 5, 7, 9, 4, 2 ]

# Usage (CLI tool)

	# Install globally
	yarn global add @anttikissa/fisher-yates-shuffle

	# shuffle lines in file.txt
	shuffle file.txt

	# shuffle lines from stdin
	ls | shuffle

	# shuffle arguments on the command line
	shuffle -- 1 2 3 "one two three"
	# =>
	one two three
	2
	1
	3

# Test

The test file (index.test.js) runs a set of tests against the shuffle
function and also some common naive shuffle functions (that can result
in not-so-random distribution of results). It's statistical in nature,
so it's possible that the tests could break at any time. In that case,
run the tests again.

	yarn
	./test

