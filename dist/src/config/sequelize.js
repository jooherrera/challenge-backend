"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connect = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: `${process.cwd()}/database/database.sqlite`,
    logging: false,
});
exports.sequelize = sequelize;
const connect = async (force = false) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force });
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
exports.connect = connect;
