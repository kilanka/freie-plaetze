import type { InferGetServerSidePropsType, NextPage } from "next";

import { client } from "../lib/api/apollo-client";
import { getSdk } from "../lib/api/generated";

const TestPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  institutions,
}) => {
  return <div>{JSON.stringify(institutions)}</div>;
};

export default TestPage;

export const getServerSideProps = async () => {
  const { data } = await getSdk(client).institutionsQuery({});

  return {
    props: data,
  };
};
