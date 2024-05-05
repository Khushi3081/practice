import Role from '../models/Role.model';
import User from '../models/User.model';
import UserRepo from '@/repository/user.repository';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
export class UserController {
  constructor(public readonly userRepository: UserRepo) {}
  public readonly addUserData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, password, varient } = req.body;
      const hashPass = await bcrypt.hash(password, 10);
      const roleId = await Role.findOne({
        where: {
          roleName: varient,
        },
      });
      const result = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        roleId: roleId.dataValues.uuid,
      });
      res.status(200).send('Added');
    } catch (error) {
      res.status(404).send('Data not found');
    }
  };

  public readonly loginData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      const pass = req.body?.password;
      if (data !== null) {
        const roleId = data.roleId;
        if (await bcrypt.compare(pass, data?.password)) {
          const token = jwt.sign({ userId: data.id, userEmail: data.email }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: '30d',
            algorithm: 'HS256',
          });
          data.token = token;
          res.status(200).send({ token, roleId, data });
        } else {
          res.send('Password does not match');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
