// 1 = true, 0 = false for calculations
function boolToInt(bool) {
	return bool ? 1 : 0;
}

// Random number between 0 and n-1
function randomNumber(n) {
	return Math.floor(Math.random() * n);
}

// Random number from n1 to n2. Includes n1, n2.
function randomRange(n1, n2) {
	return Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
}

// Random number from negative (n-1) to (n-1). Not 0.
function randomNumberSignedNonZero(n) {
	let number = randomNumber(n * 2) - n + 1;
	return number < 1 ? number - 1 : number;
}

// Random number between negative (n-1) to (n-1) except in range of (-nMin, nMin).
// If n=3 and nMin = 0.5, returns between -3, -0.5 or 0.5 and 3.
function randomNumberSignedWithMinimum(n, nMin) {
	let number = (Math.random() * 2 - 1) * (n - nMin);
	return number >= 0 ? number + nMin : number - nMin;
}
