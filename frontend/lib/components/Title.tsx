import Head from "next/head";
import React from "react";

export interface TitleProps {
	children?: string;
}

export const Title: React.FC<TitleProps> = ({children: title}) => {
	return (
		<Head>
			<title>{title ? `${title} – Freie Plätze` : "Freie Plätze"}</title>
		</Head>
	);
};
