"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("../../config/sequelize.js");
const sequelize_2 = require("sequelize");
class User extends sequelize_2.Model {
}
exports.User = User;
User.init({
    user: { type: sequelize_2.DataTypes.STRING, unique: true },
    password: sequelize_2.DataTypes.STRING,
    email: { type: sequelize_2.DataTypes.STRING, unique: true },
}, { sequelize: sequelize_1.sequelize, modelName: 'user', timestamps: false });
