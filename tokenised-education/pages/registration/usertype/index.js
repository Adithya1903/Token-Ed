import { getSession, signOut } from "next-auth/react";
import connectDB from "../../../lib/connectDB";
import Users from "../../../lib/userSchema";
import Registration from "../../../components/Register/Registration";
import { useRouter } from "next/router";

export default function UserTypePage(props) {
  const router = useRouter();
  console.log(props.registrationStatus)
  function buttonHandler() {
    router.push("/dashboard/" + (props.user.profileId).toString());
  }
  if (props.registrationStatus == false) {
    return (
      <div>
        <Registration info={props} />
      </div>
    );
  } else {
    // if statements that tell you whether student, professor or admin. return enter dasboard button.
    return (<button onClick={buttonHandler}>Enter Dashboard</button>);
  }
}

export async function getServerSideProps(context) {
  /* get user session */
  const session = await getSession(context);
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
  if (user.accountType == null) {
    return {
      props: {
        registrationStatus: false,
        user: session.user,
      },
    };
  } else {
    return {
      props: {
        registrationStatus: true,
        user: session.user,
      },
    };
  }
}
