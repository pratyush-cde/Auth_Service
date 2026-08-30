const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");

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

  async delete(userId) {
    try {
      const response = await this.userRepository.delete(userId);
      return response;
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
}

module.exports = UserService;
