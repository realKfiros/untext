'use client';
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import type { Root, List, Paragraph } from 'mdast';
import { PixelText } from './PixelText';
import {PixelTextLine} from "@/components/PixelTextLine";

export function PixelMarkdown({ source, fontSize = 5 }: { source: string, fontSize?: number }) {
	const ast = unified().use(remarkParse).parse(source) as Root;

	const elements: React.ReactNode[] = [];

	for (const node of ast.children) {
		if (node.type === 'heading') {
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize * 1.2 }}>
					<PixelTextLine node={node} size={node.depth === 1 ? fontSize * 1.2 : fontSize} />
				</div>
			);
		} else if (node.type === 'paragraph') {
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize }}>
					<PixelTextLine node={node} size={fontSize} />
				</div>
			);
		} else if (node.type === 'list') {
			elements.push(
				<div key={elements.length} style={{ marginBottom: fontSize }}>
					{(node as List).children.map((item, i) => {
						const paragraph = item.children.find((c) => c.type === 'paragraph') as Paragraph;
						return (
							<div key={i} style={{ display: 'flex' }}>
								<PixelText text="• " size={fontSize} />
								<PixelTextLine node={paragraph} size={fontSize} />
							</div>
						);
					})}
				</div>
			);
		}
	}

	return <div>{elements}</div>;
}
