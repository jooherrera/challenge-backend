"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personaje = void 0;
const sequelize_1 = require("../../config/sequelize.js");
const sequelize_2 = require("sequelize");
class Personaje extends sequelize_2.Model {
}
exports.Personaje = Personaje;
Personaje.init({
    nombre: {
        type: sequelize_2.DataTypes.STRING,
        unique: true,
    },
    edad: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    peso: {
        type: sequelize_2.DataTypes.REAL,
    },
    historia: {
        type: sequelize_2.DataTypes.STRING,
    },
    imagen: {
        type: sequelize_2.DataTypes.STRING,
    },
}, { sequelize: sequelize_1.sequelize, modelName: 'personaje', timestamps: false });
