import {Box, Container, Stack, StackProps} from "@chakra-ui/react";
import React from "react";

export interface HeaderSectionProps extends StackProps {
	children: React.ReactNode;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({children, ...stackProps}) => (
	<Box
		as="section"
		pt={{base: 16, md: 24}}
		pb={{base: 28, md: 36}}
		mb={16}
		position="relative"
		clipPath={{base: "url(#heroClipPathMobile)", md: "url(#heroClipPath)"}}
	>
		<Box
			as="svg"
			preserveAspectRatio="none"
			viewBox="0 0 800 310"
			position="absolute"
			top={0}
			width="100%"
			height="100%"
			bgGradient="linear(to-br, blue.200, green.100)"
			color="whiteAlpha.300"
		>
			<path
				d="M 0 336 C 63 328 88 252 133 208 C 168 174 210 149 234 107 C 260 62 284 12 296 0 L 0 0"
				fill="currentColor"
			/>
			<path
				d="M 800 310 L 800 80 C 800 80 785 99 740 115 C 706 133 668 144 639 171 C 606 201 574 234 560 310"
				fill="currentColor"
			/>
			<clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
				<path d="M 0 0.9 Q 0.5 1 1 0.9 L 1 0 L 0 0 L 0 0.9" />
			</clipPath>
			<clipPath id="heroClipPathMobile" clipPathUnits="objectBoundingBox">
				<path d="M 0 0.96 Q 0.5 1 1 0.96 L 1 0 L 0 0 L 0 0.96" />
			</clipPath>
		</Box>

		<Container
			maxWidth="container.xl"
			as={Stack}
			position="relative"
			gap={8}
			fontSize="xl"
			{...stackProps}
		>
			{children}
		</Container>
	</Box>
);
