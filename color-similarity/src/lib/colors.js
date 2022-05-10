import {
	formatHex,
	wcagContrast,
	displayable,
	random,
	clampChroma,
	converter,
	filterDeficiencyProt,
	differenceEuclidean
} from 'culori';

const L_STEP_SIZE = 5;
const H_STEP_SIZE = 3;

const _lch65 = converter('lch65');
const _cvd = filterDeficiencyProt(1);
const _distance = differenceEuclidean('lch65');

const _random = (chroma = 50, lRange = [0, 100]) => {
	const color = random('lch65', { c: chroma, l: lRange });
	return color;
};

const _rotateHueByDegrees = (h, d) => {
	// rotate h by d degrees
	let rotated = h + d;
	if (rotated > 360) rotated -= 360;
	return rotated;
};

const _toHex = (lch) => {
	const clamped = clampChroma(lch);
	return formatHex(clamped);
};

const generateRandom = (chroma = 50, lRange = [40, 90]) => {
	return _random(chroma, lRange);
};

const getOpposite = (hex = '#fff') => {
	const color = _lch65(hex);
	const oppositeColor = { ...color, h: _rotateHueByDegrees(color.h, 180) };
	return _toHex(oppositeColor);
};

const generatePalette = (startHex = '#fff', numColors = 10, lRange = [0, 100]) => {
	const rotation = 360 / numColors;

	let currentColor = _lch65(startHex);

	// remap current color's l* value to fit into provided range
	const distFromMin = lRange[0] - currentColor.l;
	const distFromMax = lRange[1] - currentColor.l;
	if (distFromMin < distFromMax) currentColor.l = lRange[0];
	else currentColor.l = lRange[1];

	let palette = [currentColor];

	for (let i = 0; i < numColors - 1; i++) {
		const nextColor = { ...currentColor, h: _rotateHueByDegrees(currentColor.h, rotation) };

		let greatestDistance = 0;
		let bestColor = { ...nextColor };

		// find the l* value for this color that results in the largest distance from the
		// other colors in the palette
		for (let thisL = lRange[0]; thisL < lRange[1]; thisL += L_STEP_SIZE) {
			const testColor = { ...nextColor, l: thisL };
			const testSummedDistance = palette.reduce((prev, existingColor) => {
				return prev + _distance(existingColor, testColor);
			}, 0);

			// const testDistances = palette.map((c) => _distance(c, testColor));
			// const avgDistance = testDistances.reduce((a, d) => a + d, 0) / palette.length;
			// const sumOfSquaresDist = testDistances.reduce((a, d) => {
			// 	return a + Math.pow(d - avgDistance, 2);
			// }, 0);

			// if (sumOfSquaresDist > greatestDistance) {
			// 	greatestDistance = avgDistance;
			// 	bestColor = { ...testColor };
			// }
			// const testDistance = _distance(currentColor, testColor);
			if (testSummedDistance > greatestDistance) {
				greatestDistance = testSummedDistance;
				bestColor = { ...testColor };
			}
		}
		palette.push(bestColor);
		currentColor = { ...bestColor };
	}

	let distance = 0;

	for (let i = 1; i < palette.length; i++) {
		distance += _distance(palette[i - 1], palette[i]);
	}

	return {
		colors: palette.map((c) => {
			return { hex: _toHex(c), lch: c };
		}),
		distance
	};
};

const getPaletteDistances = (palette = []) => {
	let minDistance = 1000;
	let maxDistance = 0;

	for (const color of palette) {
		for (const compareColor of palette) {
			if (_toHex(color) !== _toHex(compareColor)) {
				const distance = _distance(color, compareColor);
				if (distance > maxDistance) maxDistance = distance;
				else if (distance < minDistance) minDistance = distance;
			}
		}
	}

	return [minDistance, maxDistance];
};

const adjustPaletteForCvd = (palette = [], lRange = [0, 100]) => {
	const rotation = 360 / palette.length;
	const rotationVar = rotation / 2;

	palette = palette.map((c) => _lch65(c));

	let adjustedPalette = [];
	// if we're testing cvd, go back over the palette and adjust the hues such that there's
	// sufficient distance between each possible pair of colors
	for (const color of palette) {
		// step through the possible h* and l* changes and find the combination that
		// has the greatest contrast with the other colors
		let geatestDistance = 0;
		let bestColor = { ...color };

		for (let thisL = lRange[0]; thisL < lRange[1]; thisL += L_STEP_SIZE) {
			for (let thisH = color.h - rotationVar; thisH < color.h + rotationVar; thisH += H_STEP_SIZE) {
				const testColor = { ...color, h: thisH, l: thisL };
				const testColorCvd = _cvd({ ...testColor });

				const testSummedDistance = adjustedPalette.reduce((prev, existingColor) => {
					return prev + _distance(_cvd(existingColor), testColorCvd);
				}, 0);

				if (testSummedDistance > geatestDistance) {
					geatestDistance = testSummedDistance;
					bestColor = { ...testColor };
				}
			}
		}
		adjustedPalette.push(bestColor);
	}

	return adjustedPalette.map((c) => {
		return { hex: _toHex(c), lch: c };
	});
};

const paletteToCvdPalette = (palette) => {
	return (
		palette
			.map((c) => _cvd(_lch65(c)))
			// .sort((a, b) => _distance(a, b))
			.map((c) => _toHex(c))
	);
};

// const sortRandomColors = () => {
// 	const colors = [];
// 	for (let i = 0; i < 100; i++) {
// 		colors.push(_random());
// 	}

// 	let greatestDist = 0;
// 	let color1, color2;

// 	const distFunc = differenceCie76();

// 	for (const a of colors) {
// 		for (const b of colors) {
// 			const dist = distFunc(a10 b);
// 			if (dist > greatestDist) {
// 				greatestDist = dist;
// 				color1 = a;
// 				color2 = b;
// 			}
// 		}
// 	}

// 	console.log(greatestDist);

// 	return [formatHex(color1), formatHex(color2)];
// };

const make2DCIELCHMap = (chroma = 50) => {
	console.log('chroma', chroma);
	const colors = [];
	for (let h = 0; h < 360; h++) {
		let column = [];
		for (let l = 0; l < 100; l++) {
			const color = {
				mode: 'lch65',
				h,
				c: chroma,
				l
			};
			// if (displayable(color)) column.push({ hex: _toHex(color), lch: color });
			// else column.push(null);
			column.push({ hex: _toHex(color), lch: color });
		}
		colors.push(column);
	}

	return colors;
};

const hexToLCH = (hexColor = '#fff') => {
	return _lch65(hexColor);
};

const LCHToHex = (lchColor = {}) => {
	return _toHex(lchColor);
};

const modifyColor = (lchColor = {}, modification = {}) => {
	return _lch65({ ...lchColor, ...modification });
};

const getDistance = (color1, color2) => {
	return _distance(color1, color2);
};

export {
	generateRandom,
	getOpposite,
	getDistance,
	generatePalette,
	paletteToCvdPalette,
	getPaletteDistances,
	adjustPaletteForCvd,
	make2DCIELCHMap,
	hexToLCH,
	LCHToHex,
	modifyColor
};
