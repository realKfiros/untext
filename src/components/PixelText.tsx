import {PixelLetter} from './PixelLetter';

export function PixelText({text, size = 10}: {text: string, size?: number}) {
	return (
		<div style={{display: 'flex'}}>
			{text.split('').map((char, i) => (
				<PixelLetter key={i} char={char} size={size} />
			))}
		</div>
	);
}
