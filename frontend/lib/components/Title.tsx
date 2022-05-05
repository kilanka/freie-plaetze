import Head from "next/head";
import React, {ReactText} from "react";

export interface TitleProps {
	children?: ReactText;
}

export const Title: React.FC<TitleProps> = ({children}) => {
	const title = children as ReactText;

	return (
		<Head>
			<title>{title ? `${title} – Freie Plätze` : "Freie Plätze"}</title>
		</Head>
	);
};
