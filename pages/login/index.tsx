import { useLogin } from "@refinedev/core";

import { GetServerSideProps } from "next";

import { getServerSession } from "next-auth";
import { authOptions  } from "../api/auth/[...nextauth]";

export default function Login() {
  const { mutate: login } = useLogin();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <button onClick={() => login({})}>Sign in</button>
      <p>
        Powered by
        Django-Rest-Auth
      </p>
    </div>
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
