import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import {v4 as uuidv4} from 'uuid';
import data from './../db.js';
import { IUser } from './../Interfaces/user.interface';

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
  res.send(data.users);
});

usersRouter.get("/:id",(req: Request, res: Response) => {
  const { id } = req.params;

  const user:IUser|undefined = data.users.find((user)=>user.id===id);
  if(user){
     const response ={
      message:"user found",
      data:user
     }
     res.send(JSON.stringify(response));
  }else{
    const response ={
      message:"user not found",
      data:null
     }
     res.send(JSON.stringify(response));
  }
})
usersRouter.post("/", (req: Request, res: Response) => {
  if(req.body.user){
    const {firstName,lastName,email,password} = req.body.user;
    if(firstName&&lastName&&email&&password){

      const emailCheck = data.users.find((user)=>user.email===email);

     if(!emailCheck){
      const user:IUser ={
        id:uuidv4(),
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      }
     
      readFile('./dist/data/users.json','utf8', (err, data) => {
        if (err) throw err;
        let allUsers = JSON.parse(data);
        allUsers.push(user);
      
        writeFile('./src/data/users.json',JSON.stringify(allUsers),(err)=>{
          if (err) throw err;

          const response ={
            message :"User added successfully",
            data:user
          }
          
          res.send(JSON.stringify(response));

        })
      
      })
     }else{
      const response ={
        message :"Email already registered",
        data:null
      }
      
      res.send(JSON.stringify(response));

     }   

    }else{
      const response ={
        message :"User add Failed",
        data:null
      }
      res.send(JSON.stringify(response));
      

    }

  }else{
    const response ={
      message :"Invalid request",
      data:null
    }
    res.send(JSON.stringify(response));
  }
});


export default usersRouter;

