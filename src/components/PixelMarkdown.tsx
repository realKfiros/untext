'use client';
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';
import type { Root, RootContent, Text, Paragraph, Heading, List } from 'mdast';
import { PixelText } from './PixelText';

export function PixelMarkdown({ source, fontSize = 5 }: { source: string, fontSize?: number }) {
	const ast = unified().use(remarkParse).parse(source) as Root;

	const elements: React.ReactNode[] = [];

	for (const node of ast.children) {
		if (node.type === 'heading') {
			const text = extractText(node);
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize }}>
					<PixelText text={text} size={fontSize} />
				</div>
			);
		} else if (node.type === 'paragraph') {
			const text = extractText(node);
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize }}>
					<PixelText text={text} size={fontSize} />
				</div>
			);
		} else if (node.type === 'list') {
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize }}>
					{(node as List).children.map((item, i) => {
						const text = extractText(item);
						return (
							<div key={i} style={{ display: 'flex' }}>
								<PixelText text="• " size={fontSize} />
								<PixelText text={text} size={fontSize} />
							</div>
						);
					})}
				</div>
			);
		}
	}

	return <div>{elements}</div>;
}

function extractText(node: RootContent): string {
	let result = '';
	visit(node, 'text', (textNode: Text) => {
		result += textNode.value;
	});
	return result;
}
