import { hashPassword } from "../../lib/bcrypt.js";
import { UserEntity } from "./entity/user.entity.js";
import { DataSource } from "../../lib/datasource.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ResData } from "../../lib/resData.js";
import {
  UserAlreadyExistException,
  UserNotFoundByIdException,
  UserNotFoundException,
  UserPasswordWrongException,
} from "./exception/user.exception.js";
import { verifyPassword } from "../../lib/bcrypt.js";
import { getToken } from "../../lib/jwt.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export class UserService {
  async create(dto) {
    const founUserByLogin = await this.getUserByLogin(dto.login);

    if (founUserByLogin.data) {
      throw new UserAlreadyExistException();
    }

    const hashedPassword = await hashPassword(dto.password);

    const newUser = new UserEntity(dto.login, hashedPassword, dto.fullName);

    const userDirection = join(__dirname, "../../../database", "users.json");

    const userDataSource = new DataSource(userDirection);

    const users = userDataSource.read();
    users.push(newUser);

    userDataSource.write(users);

    const newToken = getToken(newUser.id);
    const resData = new ResData("user created", 201, {
      token: newToken,
      user: newUser,
    });

    return resData;
  }

  async getUserByLogin(login) {
    const userDirection = join(__dirname, "../../../database", "users.json");

    const userDataSource = new DataSource(userDirection);

    const users = userDataSource.read();

    const founUserByLogin = users.find((user) => user.login === login);

    let resData;
    if (founUserByLogin) {
      resData = new ResData("foun user by login", 200, founUserByLogin);
    } else {
      resData = new ResData("not found", 404, null);
    }

    return resData;
  }

  async getAll() {
    const userDirection = join(__dirname, "../../../database", "users.json");

    const userDataSource = new DataSource(userDirection);

    const users = userDataSource.read();

    const resData = new ResData("all users", 200, users);

    return resData;
  }

  async login(dto) {
    const foundUserByLogin = await this.getUserByLogin(dto.login);

    if (!foundUserByLogin.data) {
      throw new UserNotFoundException();
    }

    const isValidPassword = await verifyPassword(
      dto.password,
      foundUserByLogin.data.password
    );

    if (!isValidPassword) {
      throw new UserPasswordWrongException();
    }

    const newToken = getToken(foundUserByLogin.data.id);

    const resData = new ResData("login success", 200, {
      token: newToken,
      user: foundUserByLogin.data,
    });

    return resData;
  }

  async getUserById(id) {
    const userDirection = join(__dirname, "../../../database", "users.json");

    const userDataSource = new DataSource(userDirection);

    const users = userDataSource.read();
    console.log("users :", id);
    const founUserById = users.find((user) => user.id === id);

    console.log(founUserById);
    if (!founUserById) {
      throw new UserNotFoundByIdException();
    }

    const resData = new ResData("foun user by id", 200, founUserById);

    return resData;
  }
}
