"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genero = void 0;
const sequelize_1 = require("../../config/sequelize.js");
const sequelize_2 = require("sequelize");
class Genero extends sequelize_2.Model {
}
exports.Genero = Genero;
Genero.init({
    nombre: {
        type: sequelize_2.DataTypes.STRING,
        unique: true,
    },
    imagen: {
        type: sequelize_2.DataTypes.STRING,
    },
}, { sequelize: sequelize_1.sequelize, modelName: 'Genero', timestamps: false });
