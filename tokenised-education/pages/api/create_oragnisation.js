// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Professors from "../../lib/professorSchema";
import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
import Triangle from "triangle";
import Groups from "../../lib/groupSchema";


export default async function handler(req, res) {
  
    var myid = req.body['info']['user'].profileId
    const User = await Users.findOne({ profileId: myid });

    const vault = await triangle.vaults.create({
        name: req.body['info']['group'].name,
      });

    const group = new Groups({
        owner: User,
        status: 0,
        vault: vault.id,
        name : req.body['info']['group'].name
    });

    group.save();

    if (User.accountType == "student") {
        const student = await Students.findOne({user: User});
        student.groups_owned.push(group);
        student.save();

    }
    else if (User.accountType == "professor") {
        const professor = await Professors.findOne({user: User});
        professor.groups.push(group);
        professor.save();
    }
    else {
        console.log("how");
    }

    const wallet = await triangle.wallets.create({
        name: group.name,
        network: "ethereum_goerli",
        vault: vault.id,
      });

    res.status(200).json("success");
}
