const { where } = require("sequelize");
const { User, Role } = require("../models/index");

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

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw { error };
    }
  }

  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw { error };
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const admin = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });
      return user.hasRole(admin);
    } catch (error) {
      console.log("Something went wrong at repository layer");
      throw { error };
    }
  }
}

module.exports = UserRepository;
