import {DocumentRenderer} from "@keystone-6/document-renderer";
import React from "react";

export type DescriptionProps = {
	documentJson: string;
};

export const Description: React.FC<DescriptionProps> = ({documentJson}) => (
	<DocumentRenderer
		// @ts-expect-error incorrect prop type
		document={documentJson}
		renderers={{
			inline: {},
			block: {},
		}}
	/>
);
