import { getSession, signOut } from "next-auth/react";
import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";
import Registration from "../../components/Register/Registration";
import { useRouter } from "next/router";

export default function (props) {
  const router = useRouter();
  function myProfile() {
    router.push("/my-profile/" + props.user.profileId.toString());
  }
  function joinedOrg() {
    router.push("/my-organizations/member/" + props.user.profileId.toString());
  }
  function myOrg() {
    router.push("/my-organizations/admin/" + props.user.profileId.toString());
  }
  if (props.user.accountType == "student") {
    return (
      <div>
        <h1>account type: {props.user.accountType}</h1>
        <button onClick={myProfile}>my profile</button>
        <button onClick={joinedOrg}>joined organizations</button>
        <button onClick={myOrg}>my organizations</button>
      </div>
    );
  }
  if (props.user.accountType == "professor") {
    return (
      <div>
        <h1>account type: {props.user}</h1>
        <button onClick={myProfile}>my profile</button>
        <button onClick={myOrg}>my organizations</button>
      </div>
    );
  }
  if (props.user.accountType == "admin") {
    return <h1>admin dashboard</h1>;
  }
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
