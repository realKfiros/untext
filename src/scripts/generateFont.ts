import { createCanvas } from 'canvas';
import * as fs from 'node:fs';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!@#.-:• ';
const font = '20px monospace';
const height = 25;
const threshold = 32;
const scaleFactor = 2;
const outputPath = './src/lib/pixelFont.generated.ts';

function renderCharToPixels(char: string, font: string, maxWidth: number, height: number, threshold: number): number[][] {
	const canvas = createCanvas(maxWidth, height);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, maxWidth, height);

	ctx.font = font;
	ctx.fillStyle = 'white';
	ctx.textBaseline = 'top';
	ctx.fillText(char, 0, 0);

	const imageData = ctx.getImageData(0, 0, maxWidth, height);
	const pixels: number[][] = [];

	for (let y = 0; y < height; y++) {
		const row: number[] = [];
		for (let x = 0; x < maxWidth; x++) {
			const i = (y * maxWidth + x) * 4;
			const r = imageData.data[i];
			const g = imageData.data[i + 1];
			const b = imageData.data[i + 2];
			const brightness = (r + g + b) / 3;
			row.push(brightness > threshold ? 1 : 0);
		}
		pixels.push(row);
	}

	const trimLeft = pixels[0].findIndex((_, col) => pixels.some(row => row[col] === 1));
	let trimRight = maxWidth - 1;
	while (trimRight > trimLeft && pixels.every(row => row[trimRight] === 0)) {
		trimRight--;
	}

	return pixels.map(row => row.slice(trimLeft, trimRight + 1));
}

async function main() {
	const fontMap: Record<string, number[][]> = {};

	for (const char of chars) {
		if (char === ' ') {
			const canvas = createCanvas(10, 10);
			const ctx = canvas.getContext('2d');
			ctx.font = font;
			const spaceWidth = ctx.measureText(' ').width;
			const cols = Math.ceil(spaceWidth);
			fontMap[char] = Array(height).fill(Array(cols).fill(0));
			continue;
		}

		fontMap[char] = renderCharToPixels(char, font, height * scaleFactor, height, threshold);
	}

	const output = `// Auto-generated pixel font
export const pixelFont: Record<string, number[][]> = ${JSON.stringify(fontMap, null, 2)};
`;

	fs.writeFileSync(outputPath, output);
	console.log(`✅ Generated pixel font: ${outputPath}`);
}

main();
