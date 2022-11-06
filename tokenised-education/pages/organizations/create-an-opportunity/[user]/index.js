import { getSession, signOut } from "next-auth/react";
import connectDB from "../../../../lib/connectDB";
import Users from "../../../../lib/userSchema";
import CreateOpportunity from "../../../../components/Opportunities/CreateOpportunity";
import { useRouter } from "next/router";

export default function CreateOpportunityPage(props) { 
  
    return (
        <div>
            <CreateOpportunity info={props} />
        </div>
    );
    console.log(props.toString());
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