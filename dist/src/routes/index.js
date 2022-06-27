"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_network_1 = require("../components/User/user.network");
const personaje_network_1 = require("../components/Personaje/personaje.network");
const pelicula_network_1 = require("../components/Pelicula/pelicula.network");
const genero_network_1 = require("../components/Genero/genero.network");
exports.router = (0, express_1.Router)();
exports.router.use(user_network_1.userNetwork);
exports.router.use('/api/v1', personaje_network_1.personajeNetwork);
exports.router.use('/api/v1', pelicula_network_1.peliculaNetwork);
exports.router.use('/api/v1', genero_network_1.generoNetwork);
exports.router.get('/', (req, res) => {
    res.status(200).send('HOME API');
});
exports.router.get('*', (req, res) => {
    res.status(404).send('NOT FOUND');
});
