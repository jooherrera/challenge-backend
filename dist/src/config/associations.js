"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const personaje_model_1 = require("../components/Personaje/personaje.model");
const pelicula_model_1 = require("../components/Pelicula/pelicula.model");
const genero_model_1 = require("../components/Genero/genero.model");
personaje_model_1.Personaje.belongsToMany(pelicula_model_1.Pelicula, { through: 'personaje_pelicula' });
pelicula_model_1.Pelicula.belongsToMany(personaje_model_1.Personaje, { through: 'personaje_pelicula' });
pelicula_model_1.Pelicula.belongsToMany(genero_model_1.Genero, { through: 'pelicula_genero' });
genero_model_1.Genero.belongsToMany(pelicula_model_1.Pelicula, { through: 'pelicula_genero' });
