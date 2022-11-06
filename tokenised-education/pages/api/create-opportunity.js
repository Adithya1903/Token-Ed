// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Professors from "../../lib/professorSchema";
import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
// import Triangle from "triangle";
import Groups from "../../lib/groupSchema";
import Opportunities from "../../lib/opportunitySchema";
import { Description } from "@ethersproject/properties";


export default async function handler(req, res) {
    console.log(req.body);

    var myid = req.body['info']['user'].profileId
    const User = await Users.findOne({ profileId: myid });

    var groupid = req.body['info']['group']._id

    const group = await Groups.findOne({ _id: groupid });

    const opportunity = new Opportunities({
        group : group,
        tokens: req.body['info']['tokens'],
        description : req.body['info']['description'],
        name : req.body['info']['name']
    });

    opportunity.save();

    group.opportunities.push(opportunity);
    group.save();
    res.status(200).json("success");
}
