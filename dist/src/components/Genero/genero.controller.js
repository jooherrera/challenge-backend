"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneroController = void 0;
const boom_1 = require("@hapi/boom");
class GeneroController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const { body } = req;
            await this.service.addGenre(body);
            res.sendStatus(201);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return next((0, boom_1.boomify)(new Error('Ya existe el género'), { statusCode: 400 }));
            }
            next(error);
        }
    };
    find = async (req, res, next) => {
        try {
            const { id } = req.params;
            let genres;
            if (id) {
                genres = await this.service.findGenreByID(Number(id));
            }
            else {
                genres = await this.service.findAllGenres();
            }
            res.status(200).send(genres);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;
            await this.service.updateGenre(Number(id), body);
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.deleteGenre(Number(id));
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    addMovie = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { idMovie } = req.body;
            await this.service.addMovieToGenre(Number(id), idMovie);
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    removeMovie = async (req, res, next) => {
        try {
            const { id, idMovie } = req.params;
            await this.service.removeMovieFromGenre(Number(id), Number(idMovie));
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.GeneroController = GeneroController;
