// this is join organisations


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
import Opportunities from "../../lib/opportunitySchema";
import Groups from "../../lib/groupSchema";

export default async function handler(req, res) {

    var myid = req.body['info']['user'].profileId
    const User = await Users.findOne({ profileId: myid });


    const student = await Students.findOne({user: User});

    const group = await Groups.findById({ _id: req.body['info']['id']});

    if (group == null) {
        res.status(400).json("error organisation not found");
    }

    group.students.push(student);

    group.save()

    student.groups_joined.push(group);

    student.save();

    res.status(200).json("success");
}
