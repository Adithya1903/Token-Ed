import { id } from "ethers/lib/utils";
import { useState, useEffect } from "react";
import styles from "../../styles/globals.module.css";



export default function JoinOrganization(props) {

    async function addOrganization(){

        const id = document.getElementById("ID").value;
        
        const data = {
            info: {
                id: id,
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


    return (
    
    <div>
      {(
        <div>
        <h2>Join Organization</h2>
        <form onSubmit={JoinOrganization}>
            <div>
            <input type="text" name="" required="" id="ID"></input>
            <label>Organization ID</label>
            </div>
            <div>
            <button type="submit">Submit</button>
            </div>

        </form>
        </div>
       )}
    </div>
    );
}