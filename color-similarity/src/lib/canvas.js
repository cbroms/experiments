const setupCanvas = (width = 720, height = 300) => {
	const canvas = document.createElement('canvas');
	canvas.height = height;
	canvas.width = width;
	canvas.style.visibility = 'hidden';

	const ctx = canvas.getContext('2d');
	ctx.scale(2, 3);

	return canvas;
};

const renderColorMap = (canvas, colorMap = [], palette = []) => {
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, 720, 300);

	for (let h = 0; h < 360; h++) {
		for (let l = 0; l < 100; l++) {
			if (colorMap[h][l] !== null) {
				ctx.fillStyle = colorMap[h][99 - l].hex;
				ctx.fillRect(h, l, 1, 1);
			}
		}
	}

	// if (lightnessMax) {
	// 	ctx.strokeStyle = '#fff';
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, lightnessMax * 100);
	// 	ctx.lineTo(360, lightnessMax * 100);
	// 	ctx.stroke();
	// }

	// if (lightnessMin) {
	// 	ctx.strokeStyle = '#fff';
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, lightnessMin * 100);
	// 	ctx.lineTo(360, lightnessMin * 100);
	// 	ctx.stroke();
	// }

	for (const color of palette) {
		const h = Math.round(color.lch.h);
		const l = Math.round(color.lch.l * 100);

		ctx.fillStyle = color.hex;
		ctx.strokeStyle = '#fff';
		ctx.strokeWidth = '1px';
		ctx.fillRect(h - 5, l - 5, 10, 10);
		ctx.strokeRect(h - 5, l - 5, 10, 10);
	}

	return canvas;
};

export { setupCanvas, renderColorMap };
