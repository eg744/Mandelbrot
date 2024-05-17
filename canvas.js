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
