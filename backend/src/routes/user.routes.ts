import { UserController } from '../controller/user.controller';
import { Routes } from '@/interface/route.interface';
import UserRepo from '../repository/user.repository';
import { Router } from 'express';
class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController(new UserRepo());
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}/addUserData`).post(this.userController.addUserData);
    this.router.route(`${this.path}/login`).get(this.userController.loginData)
  }
}
export default UserRoute;
