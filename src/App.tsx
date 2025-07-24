import {PixelMarkdown} from "./components/PixelMarkdown";

const markdown = `
# Hello Pixel World

This is **pure Markdown** rendered in **divs**.

- No fonts
- No Unicode
- Just boxy love
`;

export const App = () => {
	return (
		<div style={{padding: '2rem'}}>
			<PixelMarkdown
				fontSize={2}
				source={markdown}
			/>
		</div>
	);
}
