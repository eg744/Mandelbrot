class ComplexNumber {
	constructor(real, imaginary) {
		this.real = real;
		this.imaginary = imaginary;
	}

	// Add complex numbers
	add(number) {
		return new ComplexNumber(
			this.real + number.real,
			this.imaginary + number.imaginary
		);
	}

	// Multiply complex numbers
	multiply(number) {
		return new ComplexNumber(
			this.real * number.real - this.imaginary * number.imaginary,
			this.real * number.real + this.imaginary * number.imaginary
		);
	}

	// Magnitude
	modulus() {
		return Math.sqrt(
			this.real * this.real + this.imaginary * this.imaginary
		);
	}
}

// function isInSet(c){

// }

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('canvasElement');
	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const width = canvas.width;
	const height = canvas.height;

	function getColor(iterations, maxIterations) {
		if (iterations === maxIterations) {
			return 'black';
		}
		const hue = (iterations / maxIterations) * 360;
		return `hsl(${hue}, 100%, 50%)`;
	}

	function drawMandelbrot() {
		const maxIterations = 100;

		// X axis range: [-2.5,1]
		const xMin = -2.5;
		const xMax = 1;

		// Y axis range: [-1,1]
		const yMin = -1;
		const yMax = 1;

		for (let x = 0; x < canvas.width; x++) {
			for (let y = 0; y < canvas.height; y++) {
				const c = new ComplexNumber(
					xMin + (x / canvas.width) * (xMax - xMin),
					yMin + (y / canvas.height) * (yMax - yMin)
				);

				let z = new ComplexNumber(0, 0);

				let iterations = 0;

				// z = z^2 + c
				while (z.modulus() <= 2 && iterations < maxIterations) {
					z = z.multiply(z).add(c);
					iterations++;
				}

				const color = getColor(iterations, maxIterations);
				ctx.fillStyle = color;
				ctx.fillRect(x, y, 1, 1);
			}
		}
	}
	drawMandelbrot();
});
