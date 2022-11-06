import { getSession } from "next-auth/react";
import connectDB from "../../../../lib/connectDB";
import Users from "../../../../lib/userSchema";
import Students from "../../../../lib/studentSchema";
import Professors from "../../../../lib/professorSchema";
import { useRouter } from "next/router";
import Link from "next/link";

export default function (props) {
  const router = useRouter();
  function addOrg() {
    router.push("/organizations/create-an-organization");
  }

  const groups = props.groups;

  //console.log(groups);

  async function buttonHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
    router.push("/organizations/" + e.target.value.toString());
    // console.log(group);
  }

  return (
    <div>
      <ul>
        {groups.map((group) => (
          <button onClick={(e) => buttonHandler(e)} value={group}>
            {group}
          </button>
        ))}
      </ul>
      <button onClick={addOrg}>add organizations</button>
    </div>
  );
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

  var groups;

  if (user.accountType == "student") {
    const student = await Students.findOne({ user: user });

    groups = student.groups_owned;
  } else if (user.accountType == "professor") {
    const professor = await Professors.findOne({ user: user });

    groups = professor.groups;

    console.log(groups);
  }
  if (user.accountType == "admin") {
    groups = [];
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      groups: JSON.parse(JSON.stringify(groups)),
    },
  };
}
