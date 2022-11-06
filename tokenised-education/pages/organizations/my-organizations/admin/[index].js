import { getSession, signOut } from "next-auth/react";
import connectDB from "../../../../lib/connectDB";
import Users from "../../../../lib/userSchema";
import Students from "../../../../lib/studentSchema";
import { useRouter } from "next/router";
import Professors from "../../../../lib/professorSchema";





export default async function (props) {
  const router = useRouter();

  function addOrg() {
    router.push("/organizations/create-an-organization")
  }

  if (props.user.accountType == "student") {


   const user = await Users.findOne({profileId : props.user.profileId});

    const student = await Students.findOne({user:user})

    const groups = student.groups_owned

    return (
      <div>
        <ul>
        {groups.map((group) => (
          <li>{group}</li>
        ))}
      </ul>
        <button onClick={addOrg}>add organizations</button>
      </div>
    );
  }
  if (props.user.accountType == "professor") {

    console.log("here");

    const user = await Users.findOne({ profileId: props.user.profileId });

    const professor = await Professors.findOne({user: user})

    console.log(professor)
    
    
        return (
            <>
            <div>
            <button onClick={addOrg}>add organizations</button>
            </div>
            </>
        )


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