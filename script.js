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
