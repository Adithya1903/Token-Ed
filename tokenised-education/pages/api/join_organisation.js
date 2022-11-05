// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Professors from "../../lib/professorSchema";
import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
import Triangle from "triangle";
import Groups from "../../lib/groupSchema";
import Opportunities from "../../lib/opportunitySchema";
import { Description } from "@ethersproject/properties";


export default async function handler(req, res) {

    var myid = req.body['info']['user'].profileId
    const User = await Users.findOne({ profileId: myid });


    var groupid = req.body['info']['group']._id

    const student = await Students.findOne({user: User});

    const organisation = await Groups.findOne({ _id: groupid });

    student.groups_joined.push(organisation);
    student.save();

    organisation.students.push(student);
    organisation.save();
    res.status(200).json("success");
}
