import {Pixel} from './Pixel';
import {pixelFont} from '@/lib/pixelFont.generated';

export function PixelLetter({char, size}: {char: string, size: number}) {
	const grid = pixelFont[char] || pixelFont[' '];

	return (
		<div style={{display: 'inline-block', marginRight: '1px'}}>
			{grid.map((row, rowIndex) => (
				<div key={rowIndex} style={{display: 'flex'}}>
					{row.map((cell, colIndex) => (
						<Pixel key={colIndex} on={cell === 1} size={size} />
					))}
				</div>
			))}
		</div>
	);
}
