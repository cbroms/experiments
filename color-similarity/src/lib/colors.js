import { formatHex, random, clampChroma } from 'culori';

const generateRandom = () => {
	const color = random('lab');
	const clamped = clampChroma(color);
	return formatHex(clamped);
};

export { generateRandom };
