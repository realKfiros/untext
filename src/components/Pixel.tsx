import styled from 'styled-components';

export const Pixel = styled.div<{on: boolean, size: number}>`
	width: ${({size}) => size}px;
	height: ${({size}) => size}px;
	background-color: ${({on}) => on ? '#0e0e0e' : 'transparent'};
	display: inline-block;
`;
