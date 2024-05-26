document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('canvasElement');
	const ctx = canvas.getContext('2d');

	const resetButton = document.getElementById('resetbutton');
	resetButton.addEventListener('click', resetFractal);

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	let width = canvas.width;
	let height = canvas.height;

	let imageData = ctx.createImageData(width, height);

	// Pan and zoom
	let offsetX = -width / 2;
	let offsetY = -height / 2;

	let panX = -100;
	let panY = 0;
	let zoom = 150;

	let palette = [];

	// const maxIterations = 250;
	const maxIterations = 500;

	const resolutionButton240 = document.getElementById('resolutionButton240');
	resolutionButton240.addEventListener('click', changeResolution(240, 240));

	const resolutionButton480 = document.getElementById('resolutionButton480');
	resolutionButton480.addEventListener('click', changeResolution(480, 480));

	function initalize() {
		canvas.addEventListener('mousedown', onMouseDown);

		generatePalette();
		createImage();

		main(0);
	}

	function main(animationFrame) {
		window.requestAnimationFrame(main);

		ctx.putImageData(imageData, 0, 0);
	}

	// Color of specific pixel
	function iterate(x, y, maxIterations) {
		// let imageData = ctx.createImageData(width, height);

		// Screen coordinate to fractal coordinate
		let x0 = (x + offsetX + panX) / zoom;
		let y0 = (y + offsetY + panY) / zoom;

		// Iteration vars
		let a = 0;
		let b = 0;
		let rX = 0;
		let rY = 0;

		// Iterate
		let iterations = 0;
		while (iterations < maxIterations && rX * rX + rY * rY <= 4) {
			rX = a * a - b * b + x0;
			rY = 2 * a * b + y0;

			// Next iteration
			a = rX;
			b = rY;
			iterations++;
		}

		// Color based on iterations
		let color;
		if (iterations === maxIterations) {
			color = 'black';
		} else {
			let index = Math.floor((iterations / (maxIterations - 1)) * 255);
			color = palette[index];
		}

		let pixelIndex = (y * width + x) * 4;
		imageData.data[pixelIndex] = color.r;
		imageData.data[pixelIndex + 1] = color.g;
		imageData.data[pixelIndex + 2] = color.b;
		// Alpha
		imageData.data[pixelIndex + 3] = 255;
	}

	// Create image
	function createImage() {
		// Pixels
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				iterate(x, y, maxIterations);
			}
		}
	}

	function generatePalette() {
		// Gradient
		let redOffset = 24;
		let greenOffset = 16;
		let blueOffset = 0;
		for (let i = 0; i < 256; i++) {
			palette[i] = { r: redOffset, g: greenOffset, b: blueOffset };

			if (i < 64) {
				redOffset += 3;
			} else if (i < 128) {
				greenOffset += 3;
			} else if (i < 192) {
				blueOffset += 3;
			}
		}
	}

	function zoomImage(x, y, factor, zoomIn) {
		if (zoomIn) {
			zoom *= factor;
			panX = factor * (x + offsetX + panX);
			panY = factor * (y + offsetY + panY);
		} else {
			// Zooming out
			zoom /= factor;
			panX = (x + offsetX + panX) / factor;
			panY = (y + offsetY + panY) / factor;
		}
	}

	function onMouseDown(event) {
		let position = getMousePosition(canvas, event);

		// Zoom out with Control
		let zoomIn = true;
		if (event.ctrlKey) {
			zoomIn = false;
		}

		// Pan with Shift
		let zoomFactor = 2;
		if (event.shiftkey) {
			zoomFactor = 1;
		}

		zoomImage(position.x, position.y, zoomFactor, zoomIn);

		createImage();
	}

	function getMousePosition(canvas, event) {
		let rect = canvas.getBoundingClientRect();
		return {
			x: Math.round(
				((event.clientX - rect.left) / (rect.right - rect.left)) *
					canvas.width
			),
			y: Math.round(
				((event.clientY - rect.top) / (rect.bottom - rect.top)) *
					canvas.height
			),
		};
	}

	function resetFractal() {
		panX = -100;
		panY = 0;
		zoom = 150;
		initalize();
	}

	function changeResolution(x, y) {
		// canvas.width = window.innerWidth;
		// canvas.height = window.innerHeight;
		// canvas.width = x;
		// canvas.height = y;

		// width = canvas.width;
		// height = canvas.height;
		resetFractal();
	}

	initalize();
});
