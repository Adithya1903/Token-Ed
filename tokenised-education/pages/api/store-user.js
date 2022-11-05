// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Users from "../../lib/userSchema";
import Students from "../../lib/studentSchema";
import Professors from "../../lib/professorSchema";



export default async function handler(req, res) {
  var myid = req.body['info']['user'].profileId
  var type = req.body['type']
  const User = await Users.findOne({ profileId: myid });

  if (type == "student") {
    const res = await Users.updateOne({ profileId: myid}, { name: 'update_name_func' , accountType: type});

    const student = new Students({
      user: User
  });

  student.save()

  }
  else if(type == "professor") {

    // TODO: MAKE user required and raise exception
    const res = await Users.updateOne({ profileId: myid}, { name: 'update_name_func' , accountType: type});

    const professor = new Professors({
      user: User
  });

  professor.save()
    
  }
  else if(type == "admin"){

    const res = await Users.updateOne({ profileId: myid}, { name: 'update_name_func' , accountType: type});
    // TODO: Have to Create ADMIN Class
  }
  else{
    console.log("error")
  }

  res.status(200).json("success");


}
