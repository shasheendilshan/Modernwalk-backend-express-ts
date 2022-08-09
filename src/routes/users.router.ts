import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import { v4 as uuidv4 } from "uuid";
import data from "./../db.js";
import { IUser } from "./../Interfaces/user.interface";

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(data.users);
});

usersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const user: IUser | undefined = data.users.find((user) => user.id === id);
  if (user) {
    const response = {
      message: "user found",
      data: user,
    };
    res.status(200).json(response);
  } else {
    const response = {
      message: "user not found",
      data: null,
    };
    res.status(404).json(response);
  }
});
usersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const userCheck: IUser | undefined = data.users.find(
    (user) => user.id === id
  );
  if (userCheck) {
    const newUserList = data.users.filter((user) => user?.id !== id);

    writeFile("./src/data/users.json", JSON.stringify(newUserList), (err) => {
      if (err) throw err;
    });

    const response = {
      message: "User Deleted successfully",
    };

    res.status(200).send(response);
  } else {
    const response = {
      message: "Invalid user Id",
    };
    res.status(400).json(response);
  }
});

usersRouter.post("/", (req: Request, res: Response) => {
  if (req.body.user) {
    const { firstName, lastName, email, password } = req.body.user;
    if (firstName && lastName && email && password) {
      const emailCheck = data.users.find((user) => user.email === email);

      if (!emailCheck) {
        const user: IUser = {
          id: uuidv4(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        readFile("./dist/data/users.json", "utf8", (err, data) => {
          if (err) throw err;
          let allUsers = JSON.parse(data);
          allUsers.push(user);

          writeFile(
            "./src/data/users.json",
            JSON.stringify(allUsers),
            (err) => {
              if (err) throw err;

              const response = {
                message: "User added successfully",
                data: user,
              };

              res.status(201).json(response);
            }
          );
        });
      } else {
        const response = {
          message: "Email already registered",
          data: null,
        };

        res.status(409).json(response);
      }
    } else {
      const response = {
        message: "User add Failed",
        data: null,
      };
      res.status(500).json(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});

export default usersRouter;
