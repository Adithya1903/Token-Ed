import { getSession } from "next-auth/react";
import connectDB from "../../../../lib/connectDB";
import Users from "../../../../lib/userSchema";
import Students from "../../../../lib/studentSchema"
import { useRouter } from "next/router";

export default function (props) {

const router = useRouter();
  async function addOrg() {
    //router.push("/organizations/join-an-organization")
    const id = document.getElementById("ID").value;
        
        const data = {
            info: {
                id: id,
                user: props.user,
            },            
        };

        console.log(data);
        const res = await fetch("/api/join_org", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });        
  }

    const groups = props.groups

    return (
        <div>
        <ul>
        {groups.map((group) => (
          <li>{group}</li>
        ))}
      </ul>
      <div>
        <input type="text" name="" required="" id="ID"></input>
        <label>Organization ID</label>
      </div>
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