// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Professors from "../../lib/professorSchema";
import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
import Triangle from "triangle";
import Groups from "../../lib/groupSchema";
import Opportunities from "../../lib/opportunitySchema";
import { Description } from "@ethersproject/properties";


export default async function handler(req, res) {

    
    var opid = req.body['info']['opportunity']._id

    const student = await Students.findOne({_id: req.body['info']['student']._id});

    const opportunity = await Opportunities.findOne({ _id: opid });

    opportunity.accepted_students.push(student);
    opportunity.save();
    res.status(200).json("success");
}