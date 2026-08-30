const { where } = require("sequelize");
const { User } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw { error };
    }
  }

  async delete(userId) {
    try {
      const result = await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw { error };
    }
  }
}

module.exports = UserRepository;
