import { useRouter } from "next/router";

export default function Registration(props) {
  const router = useRouter();

  async function buttonHandler() {
    const studentCheckBox = document.getElementById("student");
    const professorCheckBox = document.getElementById("professor");
    const adminCheckBox = document.getElementById("admin");

    if (studentCheckBox.checked == true) {
      await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.info),
      });
      router.push("/registration");
    } else if (professorCheckBox.checked == true) {
      const data = "student";
      await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/registration");
    } else if (adminCheckBox.checked == true) {
      const data = "student";
      await fetch("/api/store-user", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      router.push("/registration");
    }
  }

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
