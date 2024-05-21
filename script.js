// Canvas settings, setup

let ctx;
let ctxPixelData;
let ctxCanvasPixelData;
let canvasWidth;
let canvasHeight;
let canvasX;
let canvasY;
let lastColor;

let canvas = document.getElementById(canvasElement);
ctx = canvas.getContext('2d');

function initCanvas(width, height) {
	canvas.width = width;
	canvas.height = height;

	// Size, position
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	canvasX = canvas.offsetLeft;
	canvasY = canvas.offsetTop;

	// Back image, pointer to pixels array
	ctxImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	ctxCanvasPixelData = ctxImage.data;

	return canvas;
}

function setCanvasStartParams() {
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(0.5, 0.5);
}

// Draw pixel on canvas ctx. Caches last color used.
// function drawPixel(x, y, c) {
// 	if (lastColor !== c) {
// 		lastColor = c;
// 		ctx.fillStyle = colors[c];
// 	}
// 	ctx.fillRect(x, y, 1, 1);
// }

function drawLine(x0, y0, x1, y1) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function convertToPNG(canvasElement, outputElement) {
	let canvas = document.getElementById(canvasElement);
	let url = canvas.toDataURL();

	let iframe =
		'<iframe src="' +
		url +
		'" style="border: 0; padding: 0; margin: 0; width:100% height:100%;" allowfullscreen></iframe>';
	let x = window.open();
	x.document.open();
	x.document.write(iframe);
	x.document.close();
}

// window.addEventListener('load', () => {
// 	let color = 'hsl(290, 100%, 50%)';
// 	const canvas = document.getElementById('canvas1');

// 	const ctx = canvas.getContext('2d');

// 	// canvas.width = window.innerWidth;
// 	// canvas.height = window.innerHeight;

// 	canvas.width = 500;
// 	canvas.height = 500;

// 	function drawBranch(level) {}

// 	// ctx.fillStyle = `hsl(100%,100%,50%)`;
// 	ctx.fillStyle = 'green';
// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
// 	// ctx.beginPath();
// 	ctx.fill();
// 	// ctx.save();
// 	// ctx.restore();

// 	ctx.stroke();
// });

import {
	boolToInt,
	randomNumber,
	randomRange,
	randomfloat,
	randomFloatRange,
	randomNumberSignedNonZero,
	randomNumberSignedWithMinimum,
	milliseconds,
	isInRange,
} from './modules/utils.js';
////////

// ==Globals==
let MAX_CONTROL_COLORS = 5;
let MAX_COLORS = 512;
let ITERATION_LIMIT = 100;

let controlColors = new Array(MAX_CONTROL_COLORS);
let colors = new Array(MAX_COLORS);

let pMin = -2.25;
let pMax = 0.75;
let qMin = -1.5;
let qMax = 1.5;

let backImage;
let mandelbrotImage;
let mandelbrotPixels;

function textOut(s, x, y) {
	ctx.textBaseline = 'top';
	ctx.font = 'Tahoma, Verdana, Arial, Helvetica';
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#0001';
	ctx.strokeText(s, x, y);
	ctx.fillStyle = '#eeb';
	ctx.fillText(s, x, y);
}

function reportCoordsAndTiming(msg) {
	textOut(msg, 4, 4);
	textOut('x: ' + pMin + '...' + pMax, 4, 16);
	textOut('y: ' + qMin + '...' + qMax, 4, 28);
}

// Draws pixel on canvas context. Caches last color.
function drawPixel(x, y, c) {
	let currentOffset = 4 * (y * canvasWidth + x);

	// Red
	mandelbrotPixels[currentOffset] = colors[c][0];

	// Green
	mandelbrotPixels[currentOffset + 1] = colors[c][1];

	// Blue
	mandelbrotPixels[currentOffset + 2] = colors[c][2];

	mandelbrotPixels[currentOffset + 3] = 255;
}

function resetMaldelbrot(w, h) {
	let scale = 3.0 / h;

	pMin = -(9.0 / 12.0) * w * scale;
	pMax = (3.0 / 12.0) * w * scale;
	qMin = -1.5;
	qMax = 1.5;
}

function resetControlColors() {
	controlColors[0] = [0x00, 0x00, 0x20];
	controlColors[1] = [0xff, 0xff, 0xff];
	controlColors[2] = [0x00, 0x00, 0xa0];
	controlColors[3] = [0x40, 0xff, 0xff];
	controlColors[4] = [0x20, 0x20, 0xff];
}

function computeColors() {
	colors[0] = [0, 0, 0];

	for (let i = 0; i < MAX_CONTROL_COLORS - 1; i++) {
		let rStep = (controlColors[i + 1][0] - controlColors[i][0]) / 63;
		let gStep = (controlColors[i + 1][1] - controlColors[i][1]) / 63;
		let bStep = (controlColors[i + 1][2] - controlColors[i][2]) / 63;

		for (let j = 0; j < 64; j++) {
			colors[j + i * 64 + 1] = [
				Math.round(controlColors[i][0] + rStep * j),
				Math.round(controlColors[i][1] + gStep * j),
				Math.round(controlColors[i][2] + bStep * j),
			];
		}
	}

	for (let i = 257; i < MAX_COLORS; i++) {
		colors[i] = colors[i - 256];
	}
}

export function computeMandelbrot() {
	const KMAX = 256;

	let xStep = (pMax - pMin) / canvasWidth;
	let yStep = (qMax - qMin) / canvasHeight;

	// Speed
	let x = 0.0;
	let y = 0.0;
	let r = 1.0;

	// Back image and pointer to pixels array
	mandelbrotImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	mandelbrotPixels = mandelbrotImage.data;

	let start = new Date().getTime();
	for (let sy = 0; sy < canvasHeight; sy++) {
		for (let sx = 0; sx < canvasWidth; sx++) {
			let p = pMin + xStep * sx;
			let q = qMax - yStep * sy;
			let k = 0;
			let x0 = 0.0;
			let y0 = 0.0;

			do {
				x = x0 * x0 - y0 * y0 + p;
				y = 2 * x0 * y0 + q;
				x0 = x;
				y0 = y;
				r = x * x + y * y;
				k++;
			} while (r <= ITERATION_LIMIT && k < KMAX);

			if (k >= KMAX) {
				k = 0;
			}

			// draw pixel
			drawPixel(sx, sy, k);
		}
	}

	ctx.putImageData(mandelImage, 0, 0);

	let elapsed = new Date().getTime() - start;
	reportCoordsAndTiming(elapsed + ' ms');
}

// ==Mouse, touch event==

let mouseDown = false;
let mbX;
let mbY;

function canvasDown(x, y) {
	mouseDown = true;
	mbX = x;
	mbY = y;

	backImage = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
}

function canvasMove(currentX, currentY) {
	if (mouseDown) {
		let newY =
			mbY +
			(boolToInt(currentY > mbY) * 2 - 1) *
				Math.round(
					(canvasHeight * Math.abs(currentX - mbX)) / canvasWidth
				);

		ctx.putImageData(backImage, 0, 0);
		ctx.strokeStyle = 'rgb(170,255,65)';
		ctx.strokeRect(mbX, mbY, currentX - mbX, newY - mbY);
	}
}

function canvasUp(currentX, currentY) {
	if (mouseDown) {
		let newX = currentX;
		let newY =
			mbY +
			(boolToInt(currentY > mbY) * 2 - 1) *
				Math.round(
					(iCanvasHeight * Math.abs(currX - mbX)) / iCanvasWidth
				);
		if (newX < mbX) {
			let hx = newX;
			newX = mbX;
			mbX = hx;
		}
		if (newY < mbY) {
			let hy = newY;
			newY = mbY;
			mbY = hy;
		}
		console.log(mbX + ', ' + mbY + ' to ' + newX + ', ' + newY);

		// only compute if the size of the square is more than 3x3 pixels
		if (Math.abs(newX - mbX) > 3 && Math.abs(newY - mbY) > 3) {
			let pw = pMax - pMin;
			pMin = pMin + (mbX * pw) / iCanvasWidth;
			pMax = pMax - ((iCanvasWidth - newX) * pw) / iCanvasWidth;
			let qw = qMax - qMin;
			qMin = qMin + ((iCanvasHeight - newY) * qw) / iCanvasHeight;
			qMax = qMax - (mbY * qw) / iCanvasHeight;

			computeMandel();
		}
	}
	mouseDown = false;
}

function onMouseDown(e) {
	canvasDown(
		e.offsetX || e.clientX - iCanvasX,
		e.offsetY || e.clientY - iCanvasY
	);
}

function onMouseMove(e) {
	canvasMove(
		e.offsetX || e.clientX - iCanvasX,
		e.offsetY || e.clientY - iCanvasY
	);
}

function onMouseUp(e) {
	canvasUp(
		e.offsetX || e.clientX - iCanvasX,
		e.offsetY || e.clientY - iCanvasY
	);
}

function onTouchStart(e) {
	e.preventDefault();
	canvasDown(
		e.targetTouches[0].pageX - iCanvasX,
		e.targetTouches[0].pageY - iCanvasY
	);
}

function onTouchMove(e) {
	e.preventDefault();
	canvasMove(
		e.targetTouches[0].pageX - iCanvasX,
		e.targetTouches[0].pageY - iCanvasY
	);
}

function onTouchEnd(e) {
	canvasUp(
		e.changedTouches[0].pageX - iCanvasX,
		e.changedTouches[0].pageY - iCanvasY
	);
}

export function initMandelbrot(canvasElement, width, height) {
	initCanvas(canvasElement, width, height);

	resetMaldelbrot(width, height);
	resetControlColors();
	computeColors();

	// canvas.onmousedown = onMouseDown;
}

window.addEventListener('load', (e) => {
	if (e) {
		// resetPresetStyles();
		e.className = 'selected';
	}
	initMandelbrot('canvas', canvasWidth, canvasHeight);
	// resetMandel(w, h);
	computeMandelbrot();
});

function load(element, width, height) {
	// initLogger();
	if (element) {
		resetPresetStyles();
		element.className = 'selected';
	}
	initMandel('canvas', w, h);
	// resetMandel(w, h);
	computeMandelbrot();
}
