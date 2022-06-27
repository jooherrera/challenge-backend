"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generoController = exports.peliculaController = exports.personajeController = exports.userController = void 0;
require("./associations");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_controller_1 = require("../components/User/user.controller");
const user_service_1 = require("../components/User/user.service");
const _Service_1 = require("../components/Service.js");
const personaje_controller_1 = require("../components/Personaje/personaje.controller");
const pelicula_controller_1 = require("../components/Pelicula/pelicula.controller");
const genero_controller_1 = require("../components/Genero/genero.controller");
const userService = new user_service_1.UserService();
const userController = new user_controller_1.UserController(userService);
exports.userController = userController;
const service = new _Service_1.Service();
const personajeController = new personaje_controller_1.PersonajeController(service);
exports.personajeController = personajeController;
const peliculaController = new pelicula_controller_1.PeliculaController(service);
exports.peliculaController = peliculaController;
const generoController = new genero_controller_1.GeneroController(service);
exports.generoController = generoController;
