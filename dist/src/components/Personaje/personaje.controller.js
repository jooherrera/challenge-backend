"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonajeController = void 0;
const boom_1 = require("@hapi/boom");
class PersonajeController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res, next) => {
        try {
            const { body } = req;
            await this.service.createPersonaje(body);
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
            const { name, age, idMovie } = req.query;
            const { id } = req.params;
            let personajes;
            if (name && typeof name === 'string') {
                personajes = await this.service.findByName(name);
            }
            else if (age && typeof age === 'string') {
                personajes = await this.service.findByAge(Number(age));
            }
            else if (idMovie && typeof idMovie === 'string') {
                personajes = await this.service.findByMovie(Number(idMovie));
            }
            else if (id) {
                personajes = await this.service.findPersonajeByID(Number(id));
            }
            else {
                personajes = await this.service.findAll();
            }
            res.status(200).send(personajes);
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;
            await this.service.updatePersonaje(Number(id), body);
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.service.deletePersonaje(Number(id));
            res.sendStatus(202);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.PersonajeController = PersonajeController;
