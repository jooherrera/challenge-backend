"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
const sequelize_1 = require("../../config/sequelize.js");
const sequelize_2 = require("sequelize");
class Pelicula extends sequelize_2.Model {
}
exports.Pelicula = Pelicula;
Pelicula.init({
    titulo: {
        type: sequelize_2.DataTypes.STRING,
        unique: true,
    },
    fecha_creacion: {
        type: sequelize_2.DataTypes.DATE,
    },
    calificacion: {
        type: sequelize_2.DataTypes.INTEGER,
    },
    imagen: {
        type: sequelize_2.DataTypes.STRING,
    },
}, { sequelize: sequelize_1.sequelize, modelName: 'pelicula', timestamps: false });
