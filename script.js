window.addEventListener('load', () => {
	let color = 'hsl(290, 100%, 50%)';
	const canvas = document.getElementById('canvas1');

	const ctx = canvas.getContext('2d');

	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;

	canvas.width = 500;
	canvas.height = 500;

	function drawBranch(level) {}

	// ctx.fillStyle = `hsl(100%,100%,50%)`;
	ctx.fillStyle = 'green';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// ctx.beginPath();
	ctx.fill();
	// ctx.save();
	// ctx.restore();

	ctx.stroke();
});
