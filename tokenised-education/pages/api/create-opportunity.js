// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Professors from "../../lib/professorSchema";
import Students from "../../lib/studentSchema";
import Users from "../../lib/userSchema";
// import Triangle from "triangle";
import Groups from "../../lib/groupSchema";
import Opportunities from "../../lib/opportunitySchema";
import { Description } from "@ethersproject/properties";

export default async function handler(req, res) {
  var myid = req.body["info"]["user"].profileId;
  const User = await Users.findOne({ profileId: myid });

  var groupid = req.body["info"]["group"];

  const group = await Groups.findById(groupid);

  const tokens = JSON.parse(JSON.stringify(req.body["info"]["tokens"]));
  console.log(tokens);

  const opportunity = new Opportunities({
    group: group,
    tokens: tokens,
    description: req.body["info"]["description"],
    name: req.body["info"]["name"],
  });

  opportunity.save();

  group.opportunities.push(opportunity);
  group.save();
  res.status(200).json("success");
}
