const { where } = require("sequelize");
const { User, Role } = require("../models/index");
const { ValidationError } = require("../utils/validation-error");
const { ClientError } = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      console.log("Something went wrong in user Repo");
      throw error;
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
      // console.log(error);
      console.log("Something went wrong in user Repo");
      throw error;
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
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new ClientError(
          "AttributeNotFound",
          "invalid email sent",
          "please check email",
          StatusCodes.NOT_FOUND,
        );
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in user Repo");
      throw error;
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
      throw error;
    }
  }
}

module.exports = UserRepository;
