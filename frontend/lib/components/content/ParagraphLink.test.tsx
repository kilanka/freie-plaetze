import React from "react";
import {render} from "test-utils";

import {ParagraphLink} from "./ParagraphLink";

it("renders a link to a paragraph URL", () => {
	const {container} = render(<ParagraphLink paragraph="1">Content</ParagraphLink>);
	expect(container).toHaveTextContent("Content");
	expect(container).toMatchSnapshot();
});

it("falls back to a default link text when no children are provided", () => {
	const {container} = render(<ParagraphLink paragraph="1" />);
	expect(container).toHaveTextContent("§ 1 SGB VIII");
	expect(container).toMatchSnapshot();
});
