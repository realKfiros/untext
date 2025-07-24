import React from 'react';
import { PixelText } from './PixelText';
import type { PhrasingContent, Text } from 'mdast';

type PixelTextLineProps = {
	node: { children: PhrasingContent[] };
	size: number;
}

export const PixelTextLine: React.FC<PixelTextLineProps> = ({node, size}) => {
	const children: React.ReactNode[] = [];

	let key = 0;

	for (const child of node.children) {
		switch (child.type) {
			case 'text':
				children.push(
					<PixelText key={key++} text={child.value} size={size} />
				);
				break;
			case 'strong':
				children.push(
					<PixelText key={key++} text={extractText(child.children)} size={size} />
				);
				break;
			case 'emphasis':
				children.push(
					<PixelText key={key++} text={extractText(child.children)} size={size - 1} />
				);
				break;
			case 'inlineCode':
				children.push(
					<PixelText key={key++} text={`\`${child.value}\``} size={size} />
				);
				break;
			default:
				console.log(child);
				children.push(
					<PixelText key={key++} text={`<?>`} size={size} />
				);
		}
	}

	return <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{children}</div>;
}

function extractText(nodes: PhrasingContent[]): string {
	return nodes
		.filter((n): n is Text => n.type === 'text')
		.map((n) => n.value)
		.join('');
}
