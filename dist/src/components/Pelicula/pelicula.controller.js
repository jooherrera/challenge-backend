"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculaController = void 0;
const boom_1 = require("@hapi/boom");
class PeliculaController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const { body } = req;
            await this.service.addMovie(body);
            res.sendStatus(200);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return next((0, boom_1.boomify)(new Error('Ya existe el personaje'), { statusCode: 400 }));
            }
            next(error);
        }
    };
    find = async (req, res, next) => {
        try {
            const { name, genre, order } = req.query;
            let peliculas;
            if (name && typeof name === 'string') {
                peliculas = await this.service.findMovieByName(name);
                return res.status(200).send(peliculas);
            }
            if (genre && typeof genre === 'string') {
                peliculas = await this.service.findMovieByGenre(genre);
                return res.status(200).send(peliculas);
            }
            if (order && typeof order === 'string') {
                peliculas = await this.service.findMovieByOrder(order);
                return res.status(200).send(peliculas);
            }
            peliculas = await this.service.findAllMovies();
            res.status(200).send(peliculas);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;
            await this.service.updateMovie(Number(id), body);
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.deleteMovie(Number(id));
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    addCharacter = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { idCharacter } = req.body;
            await this.service.addCharacterToMovie(Number(id), idCharacter);
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    removeCharacter = async (req, res, next) => {
        try {
            const { id, idCharacter } = req.params;
            await this.service.removeCharacterFromMovie(Number(id), Number(idCharacter));
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.PeliculaController = PeliculaController;
