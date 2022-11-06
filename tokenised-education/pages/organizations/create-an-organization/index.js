import { getSession, signOut } from "next-auth/react";
import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";
import Registration from "../../components/Register/Registration";
import { useRouter } from "next/router";

export default function (props) {
    

    return <h1>add organization page</h1>;
  
}

export async function getServerSideProps(context) {
  /* get user session */
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  /* connect to mongoDB, find user and check if they need to register account details */
  await connectDB();
  const user = await Users.findOne({ profileId: session.user.profileId });
  console.log(user.accountType);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
