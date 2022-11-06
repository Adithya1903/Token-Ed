import { useState, useEffect } from "react";
import styles from "../../styles/globals.module.css";



export default function CreateOpportunity(props) {

    async function submitOpportunity(){

        const name = document.getElementById("name").value;
        const email = document.getElementById("description").value;
        const cs = document.getElementById("cstokens").value;
        const ce = document.getElementById("cetokens").value;
        const ca = document.getElementById("catokens").value;
        const cb = document.getElementById("cbtokens").value;
        const well = document.getElementById("wtokens").value;

        // creae arr
        
        const data = {
            info: {
                user: props.info.user,
                name: "kshitij",
                description: "hello",
                tokens: [1,2,3]
            },
                // name: name,
                // description: description,
                // tokens: [cs, ce, ca, cb, well],
            
        };

        console.log(data);
        const res = await fetch("/api/create-opportunity", {
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
        <h2>Create Opportunity</h2>
        <form onSubmit={submitOpportunity}>
            <div>
            <input type="text" name="" required="" id="name"></input>
            <label>Name</label>
            </div>
            <div>
            <input type="text" name="" required="" id="description"></input>
            <label>Description</label>
            </div>
            <div>
            <input type="text" name="" required="" id="cstokens"></input>
            <label>Number of College of Science Tokens</label>
            </div>
            <div>
            <input type="text" name="" required="" id="cetokens"></input>
            <label>Number of College of Engineering</label>
            </div>
            <div>
            <input type="text" name="" required="" id="catokens"></input>
            <label>Number of College of Arts Tokens</label>
            </div>
            <div>
            <input type="text" name="" required="" id="cbtokens"></input>
            <label>Number of College of Business Tokens</label>
            </div>
            <div>
            <input type="text" name="" required="" id="wtokens"></input>
            <label>Number of College of Wellness Tokens</label>
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