import { getSession } from "next-auth/react";
import connectDB from "../../../../lib/connectDB";
import Users from "../../../../lib/userSchema";
import Students from "../../../../lib/studentSchema"
import { useRouter } from "next/router";

export default function (props) {

const router = useRouter();
  function addOrg() {
    router.push("/organizations/join-an-organization")
  }

    const groups = props.groups

    return (
        <div>
        <ul>
        {groups.map((group) => (
          <li>{group}</li>
        ))}
      </ul>
        <button onClick={addOrg}>join an organization</button>
      </div>
    );
        
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

    var groups;

    if (user.accountType == "student") {
        const student = await Students.findOne({user: user})
        console.log(student);

        groups = student.groups_joined;
    }
  

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        groups: JSON.parse(JSON.stringify(groups)),
      },
    };
  }