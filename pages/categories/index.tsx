import { HeadlessListInferencer } from "@refinedev/inferencer/headless";
import { GetServerSideProps } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function CategoryList() {
  return <HeadlessListInferencer />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {},
  };
};
