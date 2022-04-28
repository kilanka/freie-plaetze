import {wrapper} from "./store";

/**
 * Can be exported as `getServerSideProps` from pages that need to be server-rendered
 */
export const emptyGetServerSideProps = wrapper.getServerSideProps(() => async () => ({props: {}}));

export function getAbsoluteImageUrl(imagePath: string) {
	return process.env.NEXT_PUBLIC_BACKEND_URL! + imagePath;
}
