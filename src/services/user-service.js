const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step 1-> fetch the user using the email
      const user = await this.userRepository.getByEmail(email);
      //step 2-> compare incoming plain password with encrypted password
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("passwords doesnt match");
        throw { error: "incorrect password" };
      }

      //step 3-> if password match then create token and send to user
      const newJwt = this.createToken({ email: user.email, id: user.id });
      return newJwt;
    } catch (error) {
      console.log("Something went wrong in signIn process");
      throw { error };
    }
  }

  async delete(userId) {
    try {
      const response = await this.userRepository.delete(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "invalid token" };
      }

      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "no user with this token exists" };
      }

      return user.id;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }

  verifyToken(token) {
    const response = jwt.verify(token, JWT_KEY);
    return response;
  }
  catch(error) {
    console.log("Something went wrong at service layer");
    throw { error };
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong at service layer");
      throw { error };
    }
  }
}

module.exports = UserService;
