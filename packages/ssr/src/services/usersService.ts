import { BaseService } from "./BaseService";
import { User } from "models";
import { ENDPOINTS } from ".";
import { IUserDTO } from "@mapbul-pub/types";

class UsersService extends BaseService<IUserDTO, User> {
  constructor() {
    super(
      ENDPOINTS.users,
      user => User.New(user),
    )
  }
}

export const usersService = new UsersService();
