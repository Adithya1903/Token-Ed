import { getSession } from "next-auth/react";
import connectDB from "../../../lib/connectDB";
import Users from "../../../lib/userSchema";
import Students from "../../../lib/studentSchema";
import Professors from "../../../lib/professorSchema";
import { useRouter } from "next/router";
import Link from "next/link";
import Groups from "../../../lib/groupSchema";

export default function OrganizationPage(props) {
  return <h1>{props.opportunities}</h1>;
}

export async function getServerSideProps(context) {
  /* get user session */
  const session = await getSession(context);
  const org = context.params.organization;

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
  }
  if (user.accountType == "admin") {
    groups = [];
  }

  const organization = await Groups.findOne({ groupId: org });
  const opportunities = organization.opportunities;

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      groups: JSON.parse(JSON.stringify(groups)),
      opportunities: opportunities,
    },
  };
}
