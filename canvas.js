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
} from './script.js';
// Canvas settings, setup

let ctx;
let ctxPixelData;
let ctxCanvasPixelData;
let canvasWidth;
let canvasHeight;
let canvasX;
let canvasY;
let lastColor;

function initCanvas(canvasElement, width, height) {
	let canvas = document.getElementById(canvasElement);
	ctx = canvas.getContext('2d');
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
function drawPixel(x, y, c) {
	if (lastColor !== c) {
		lastColor = c;
		ctx.fillStyle = colors[c];
	}
	ctx.fillRect(x, y, 1, 1);
}

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
