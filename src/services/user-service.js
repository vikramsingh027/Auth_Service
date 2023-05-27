const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
const { Role } = require("../models/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await this.userRepository.destroy(userId);
      return true;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step1 -> fetch user using email
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        console.log("Email does not match");
        throw { error: "This email does not exist" };
      }
      //step2 -> compare incoming plain password with stored encrypted password
      const passwordsMatch = await this.#checkPassword(
        plainPassword,
        user.password
      );
      if (!passwordsMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect Password" };
      }
      //step3 -> if passwords match then create a token and send it to the user
      const newJWT = this.#createToken({
        email: user.email,
        id: user.id,
      });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the signin process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.#verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await this.userRepository.getById(userId);
      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong");
      throw error;
    }
  }

  #createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.log("something went wrong in token creation");
      throw error;
    }
  }

  #verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("something went wrong in token verificaiton");
      throw error;
    }
  }

  async #checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      const response = await bcrypt.compare(
        userInputPlainPassword,
        encryptedPassword
      );
      return response;
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }
}

module.exports = UserService;
