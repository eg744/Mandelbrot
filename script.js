class ComplexNumber {
	constructor(real, imaginary) {
		this.real = real;
		this.imaginary = imaginary;
	}

	add(number) {
		return new ComplexNumber(
			this.real + number.real,
			this.imaginary + number.imaginary
		);
	}

	multiply(number) {
		return new ComplexNumber(
			this.real * number.real - this.imaginary * number.imaginary,
			this.real * number.real + this.imaginary * number.imaginary
		);
	}

	modulus() {
		return Math.sqrt(
			this.real * this.real + this.imaginary * this.imaginary
		);
	}
}

// function computeMandelbrot(c){
//     const
// }
