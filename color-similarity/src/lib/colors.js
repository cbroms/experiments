import {
	formatHex,
	wcagContrast,
	displayable,
	random,
	clampChroma,
	clampRgb,
	converter,
	filterDeficiencyProt,
	differenceEuclidean
} from 'culori';

const L_STEP_SIZE = 1;
const H_STEP_SIZE = 1;

const _lch = converter('lch');
const _cvd = filterDeficiencyProt(1);
const _distance = differenceEuclidean('lch');

const _random = (chroma = 50, lRange = [0, 100]) => {
	const color = random('lch', { c: chroma, l: lRange });
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
	const color = _lch(hex);
	const oppositeColor = { ...color, h: _rotateHueByDegrees(color.h, 180) };
	return _toHex(oppositeColor);
};

const _getPaletteDistance = (palette = []) => {
	let distanceSum = 0;

	for (let i = 1; i < palette.length; i++) {
		distanceSum += _distance(palette[i - 1].lch, palette[i].lch);
	}
	return distanceSum;
};

const _getPaletteMinMax = (palette = []) => {
	let min = 2000;
	let max = 0;

	for (const color of palette) {
		for (const compareColor of palette) {
			if (color.hex !== compareColor.hex) {
				const distance = _distance(color.lch, compareColor.lch);
				if (distance > max) max = distance;
				if (distance < min) min = distance;
			}
		}
	}

	return { min, max };
};

const _getPaletteColorMinMax = (palette = [], compareColor) => {
	let min = 2000;
	let max = 0;

	for (const color of palette) {
		const distance = _distance(color.lch, compareColor.lch);
		if (distance > max) max = distance;
		if (distance < min) min = distance;
	}
	return { max, min };
};

const _getPaletteDistanceMetrics = (palette = []) => {
	const distance = _getPaletteDistance(palette);
	const { min, max } = _getPaletteMinMax(palette);

	return { sum: distance, min, max };
};

const generatePalette = (
	startHex = '#fff',
	numColors = 10,
	lRange = [0, 100],
	cvdAdjust = false
) => {
	const rotation = 360 / numColors;
	const halfRotation = rotation / 2;

	let currentColor = _lch(startHex);

	// remap current color's l* value to fit into provided range
	const distFromMin = lRange[0] - currentColor.l;
	const distFromMax = lRange[1] - currentColor.l;
	if (distFromMin < distFromMax) currentColor.l = lRange[0];
	else currentColor.l = lRange[1];

	let palette = [{ hex: _toHex(currentColor), lch: currentColor }];
	let paletteCvd = [{ hex: _toHex(_cvd(currentColor)), lch: _cvd(currentColor) }];

	// generate the optimal set of new colors
	for (let i = 0; i < numColors - 1; i++) {
		const nextColor = { ...currentColor, h: _rotateHueByDegrees(currentColor.h, rotation) };

		// let greatestDistance = 0;
		// let bestColor = { ...nextColor };
		let distances = [];
		let distancesCvd = [];
		let colors = [];

		// find the l* value for this color that results in the largest minimum distance from
		// the other colors in the palette
		for (let thisL = lRange[0]; thisL < lRange[1]; thisL += L_STEP_SIZE) {
			if (cvdAdjust) {
				// loop through the hues around the test hue
				for (
					let thisH = nextColor.h - halfRotation;
					thisH < nextColor.h + halfRotation;
					thisH += H_STEP_SIZE
				) {
					const testColorLch = { ...nextColor, l: thisL, h: thisH };
					const testColor = { hex: _toHex(testColorLch), lch: testColorLch };
					const testMin = _getPaletteColorMinMax(palette, testColor).min;
					distances.push(testMin);

					const testColorLchCvd = _cvd(testColorLch);
					const testColorCvd = { hex: _toHex(testColorLchCvd), lch: testColorLchCvd };
					// todo: use cvd palette
					const testMinCvd = _getPaletteColorMinMax(paletteCvd, testColorCvd).min;
					distancesCvd.push(testMinCvd);

					colors.push({ ...testColor.lch });
				}
			} else {
				const testColorLch = { ...nextColor, l: thisL };
				const testColor = { hex: _toHex(testColorLch), lch: testColorLch };

				const { min } = _getPaletteColorMinMax(palette, testColor);
				distances.push(min);
				colors.push({ ...testColor.lch });
			}

			// const testSummedDistance = palette.reduce((prev, existingColor) => {
			// 	return prev + _distance(existingColor.lch, testColor);
			// }, 0);

			// if (cvdAdjust) {
			// 	const testSummedDistance
			// } else {

			// }

			// if (testSummedDistance > greatestDistance) {
			// 	greatestDistance = testSummedDistance;
			// 	bestColor = { ...testColor };
			// }
		}

		let largestDistIdx = 0;

		if (cvdAdjust) {
			const distancesMean = distances.reduce((p, d) => p + d, 0) / distances.length;
			const distancesCvdMean = distancesCvd.reduce((p, d) => p + d, 0) / distancesCvd.length;

			let maxDistFromMean = 0;

			for (let i = 0; i < distances.length; i++) {
				const distFromMean = distances[i] - distancesMean;
				const distFromMeanCvd = distancesCvd[i] - distancesCvdMean;
				if (distFromMean + distFromMeanCvd > maxDistFromMean) {
					maxDistFromMean = distFromMean + distFromMeanCvd;
					largestDistIdx = i;
				}
			}
		} else {
			for (let i = 0; i < distances.length; i++) {
				if (distances[i] > distances[largestDistIdx]) largestDistIdx = i;
			}
		}

		const bestColor = colors[largestDistIdx];
		palette.push({ hex: _toHex(bestColor), lch: bestColor });
		paletteCvd.push({ hex: _toHex(_cvd(bestColor)), lch: _cvd(bestColor) });
		currentColor = bestColor;
	}

	return {
		colors: palette,
		distance: _getPaletteDistanceMetrics(palette)
	};
};

const generatePaletteIcosahedron = (c) => {
	// 10 points, +/- 26.57deg l* intervals, 36deg hue intervals
	// 26.57 deg = 0.4637 rad, 0.4637 * 50 = 23.15
	// l* high = 50 + 23.15 = 73.15, l* low = 50 - 23.15 = 26.85
	const colors = [];
	let high = true;
	for (let h = 0; h < 360; h += 36) {
		let l;
		if (high) {
			l = 73.15;

			high = false;
		} else {
			l = 26.85;

			high = true;
		}
		const color = {
			mode: 'lch',
			c,
			l,
			h
		};
		colors.push({ hex: _toHex(color), lch: color });
	}
	return { colors, distance: _getPaletteDistanceMetrics(colors) };
};

// const adjustPaletteForCvd = (palette = [], lRange = [0, 100]) => {
// 	const rotation = 360 / palette.length;
// 	const rotationVar = rotation / 2;

// 	palette = palette.map((c) => _lch(c));

// 	let adjustedPalette = [];
// 	// if we're testing cvd, go back over the palette and adjust the hues such that there's
// 	// sufficient distance between each possible pair of colors
// 	for (const color of palette) {
// 		// step through the possible h* and l* changes and find the combination that
// 		// has the greatest contrast with the other colors
// 		let geatestDistance = 0;
// 		let bestColor = { ...color };

// 		for (let thisL = lRange[0]; thisL < lRange[1]; thisL += L_STEP_SIZE) {
// 			for (let thisH = color.h - rotationVar; thisH < color.h + rotationVar; thisH += H_STEP_SIZE) {
// 				const testColor = { ...color, h: thisH, l: thisL };
// 				const testColorCvd = _cvd({ ...testColor });

// 				const testSummedDistance = adjustedPalette.reduce((prev, existingColor) => {
// 					return prev + _distance(_cvd(existingColor), testColorCvd);
// 				}, 0);

// 				if (testSummedDistance > geatestDistance) {
// 					geatestDistance = testSummedDistance;
// 					bestColor = { ...testColor };
// 				}
// 			}
// 		}
// 		adjustedPalette.push(bestColor);
// 	}

// 	return adjustedPalette.map((c) => {
// 		return { hex: _toHex(c), lch: c };
// 	});
// };

const paletteToCvdPalette = (palette = []) => {
	const cvdColorsLch = palette.colors.map((c) => _cvd(c.lch));

	const cvdColors = cvdColorsLch.map((c) => {
		return { hex: _toHex(c), lch: c };
	});
	return {
		colors: cvdColors,
		distance: _getPaletteDistanceMetrics(cvdColors)
	};
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

const make2DCIELCHMap = (chroma = 50, cvd = false) => {
	const colors = [];
	for (let h = 0; h < 360; h++) {
		let column = [];
		for (let l = 0; l < 100; l++) {
			let color = {
				mode: 'lch',
				h,
				c: chroma,
				l
			};
			if (cvd) color = _cvd(color);
			// if (displayable(color)) column.push({ hex: _toHex(color), lch: color });
			// else column.push(null);
			column.push({ hex: _toHex(color), lch: color });
		}
		colors.push(column);
	}

	return colors;
};

const hexToLCH = (hexColor = '#fff') => {
	return _lch(hexColor);
};

const LCHToHex = (lchColor = {}) => {
	return _toHex(lchColor);
};

const modifyColor = (lchColor = {}, modification = {}) => {
	return _lch({ ...lchColor, ...modification });
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
	make2DCIELCHMap,
	hexToLCH,
	LCHToHex,
	modifyColor,
	generatePaletteIcosahedron
};
