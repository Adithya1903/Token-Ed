import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/globals.module.css";

export default function CreateOrganization(props) {
  const router = useRouter();

  async function submitOrganization(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    // creae arr

    const data = {
      info: {
        user: props.info.user,
        group: {
          name: name,
        },
      },
    };

    console.log(data);
    const res = await fetch("/api/create_organisation", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(props.info.user.profileId);
    router.push(
      "/organizations/my-organizations/admin/" +
        props.info.user.profileId.toString()
    );
  }

  return (
    <div>
      {
        <div>
          <h2>Create Organization</h2>
          <form onSubmit={submitOrganization}>
            <div>
              <input type="text" name="" required="" id="name"></input>
              <label>Name</label>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      }
    </div>
  );
}
