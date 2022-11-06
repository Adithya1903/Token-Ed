import { useState, useEffect } from "react";
import styles from "../../styles/globals.module.css";


export default function Registration(props) {

  const [infoPresent, setInfoPresent] = useState(false);
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    console.log(infoPresent);
    console.log(props.info);
  }, [infoPresent]);
  if (!infoPresent) {
    return (
      <div>
        <fieldset>
          <legend>Select who you are: </legend>
          <div>
            <input type="radio" id="student" name="status" />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input type="radio" id="professor" name="status" />
            <label htmlFor="professor">Professor</label>
          </div>
          <div>
            <input type="radio" id="admin" name="status" />
            <label htmlFor="admin">Administrator</label>
          </div>
          <div>
            <button onClick={buttonHandler}>Submit</button>
          </div>
        </fieldset>
      </div>
    );
  }

  async function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (accountType == "student"){
      const data = {
        type: "student",
        name: name,
        info: props.info,
      };
      const res = await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (accountType == "professor"){
      const data = {
        type: "professor",
        name: name,
        info: props.info,
      };
      const res = await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (accountType == "admin"){
      const data = {
        type: "admin",
        name: name,
        info: props.info,
      };
      const res = await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  }

  async function buttonHandler() {
  
    setInfoPresent([true]);
    setAccountType("student")
    const studentCheckBox = document.getElementById("student");
    const professorCheckBox = document.getElementById("professor");
    const adminCheckBox = document.getElementById("admin");


    if (studentCheckBox.checked == true) {
      setAccountType("student");
      
    } else if (professorCheckBox.checked == true) {
      setAccountType("professor")
      
    } else if (adminCheckBox.checked == true) {
      setAccountType("admin")
      
    }
  }

  return(
    <div>
      {(
        <div>
        <h2>Register</h2>
        <form>
          <div>
            <input type="text" name="" required="" id="name"></input>
            <label>Name</label>
          </div>
          <div>
            <input type="text" name="" required="" id="email"></input>
            <label>Email</label>
          </div>
          <div>
            <button onClick={submitForm}>Submit</button>
          </div>
        </form>
        </div>
       )}
    </div>
  );
  
}
