"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const personaje_model_1 = require("./Personaje/personaje.model");
const pelicula_model_1 = require("./Pelicula/pelicula.model");
const boom_1 = require("@hapi/boom");
const genero_model_1 = require("./Genero/genero.model");
class Service {
    constructor() { }
    async createPersonaje(p) {
        await personaje_model_1.Personaje.create(p);
    }
    deletePersonaje = async (id) => {
        const resp = await personaje_model_1.Personaje.destroy({ where: { id } });
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('No existe el personaje'), { statusCode: 400 });
        }
    };
    updatePersonaje = async (id, p) => {
        const resp = await personaje_model_1.Personaje.update(p, { where: { id } });
        if (resp[0] === 0) {
            throw (0, boom_1.boomify)(new Error('No existe el personaje'), { statusCode: 400 });
        }
    };
    findAll = async () => {
        return await personaje_model_1.Personaje.findAll({ attributes: ['imagen', 'nombre'] });
    };
    findByName = async (name) => {
        return await personaje_model_1.Personaje.findAll({ where: { nombre: name }, include: pelicula_model_1.Pelicula });
    };
    findByAge = async (age) => {
        return await personaje_model_1.Personaje.findAll({ where: { edad: age }, include: pelicula_model_1.Pelicula });
    };
    findByMovie = async (idMovie) => {
        const personajesFound = await pelicula_model_1.Pelicula.findOne({ where: { id: idMovie }, include: personaje_model_1.Personaje });
        if (!personajesFound) {
            return [];
        }
        const cleaner = personajesFound.personajes.map((p) => {
            const { personaje_pelicula, ...rest } = p.toJSON();
            return rest;
        });
        return cleaner;
    };
    findPersonajeByID = async (id) => {
        const resp = await personaje_model_1.Personaje.findOne({ where: { id }, include: pelicula_model_1.Pelicula });
        if (!resp)
            throw (0, boom_1.boomify)(new Error('No existe el personaje'), { statusCode: 400 });
        return resp;
    };
    addMovie = async (newMovie) => {
        const movie = {
            ...newMovie,
            fecha_creacion: new Date(newMovie.fecha_creacion),
        };
        await pelicula_model_1.Pelicula.create(movie);
    };
    findMovieByName = async (title) => {
        const movies = await pelicula_model_1.Pelicula.findAll({ include: personaje_model_1.Personaje });
        if (!movies)
            return [];
        const filtered = movies.filter((movie) => movie.toJSON().titulo.toLowerCase().includes(title.toLowerCase()));
        return filtered;
    };
    findMovieByGenre = async (genre) => {
        const movies = await genero_model_1.Genero.findAll({ where: { nombre: genre }, include: pelicula_model_1.Pelicula });
        if (!movies)
            return [];
        return movies;
    };
    findMovieByOrder = async (order) => {
        const movies = await pelicula_model_1.Pelicula.findAll({ include: personaje_model_1.Personaje });
        if (!movies)
            return [];
        let ordered;
        if (order === 'DES') {
            ordered = movies.sort((a, b) => b.fecha_creacion - a.fecha_creacion);
        }
        else {
            ordered = movies.sort((a, b) => a.fecha_creacion - b.fecha_creacion);
        }
        return ordered;
    };
    findAllMovies = async () => {
        const movies = await pelicula_model_1.Pelicula.findAll({ attributes: ['imagen', 'titulo', 'fecha_creacion'] });
        return movies;
    };
    findMovieByID = async (id) => {
        const movie = await pelicula_model_1.Pelicula.findOne({ where: { id }, include: personaje_model_1.Personaje });
        if (!movie)
            throw (0, boom_1.boomify)(new Error('No existe la pelicula'), { statusCode: 400 });
        return movie;
    };
    deleteMovie = async (id) => {
        const resp = await pelicula_model_1.Pelicula.destroy({ where: { id } });
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('La pelicula no existe'), { statusCode: 400 });
        }
    };
    updateMovie = async (id, movie) => {
        const resp = await pelicula_model_1.Pelicula.update(movie, { where: { id } });
        if (resp[0] === 0) {
            throw (0, boom_1.boomify)(new Error('No existe la pelicula'), { statusCode: 400 });
        }
    };
    addCharacterToMovie = async (idMovie, idCharacter) => {
        const character = await personaje_model_1.Personaje.findOne({ where: { id: idCharacter } });
        const movie = await pelicula_model_1.Pelicula.findOne({ where: { id: idMovie } });
        if (!character || !movie) {
            throw (0, boom_1.boomify)(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 });
        }
        movie.addPersonaje(character);
    };
    removeCharacterFromMovie = async (id, idCharacter) => {
        const character = await personaje_model_1.Personaje.findOne({ where: { id: idCharacter } });
        const movie = await pelicula_model_1.Pelicula.findOne({ where: { id } });
        if (!character || !movie) {
            throw (0, boom_1.boomify)(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 });
        }
        const resp = await movie.removePersonaje(character);
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('El personaje o la pelicula, no existe'), { statusCode: 400 });
        }
    };
    addGenre = async (newGenre) => {
        await genero_model_1.Genero.create(newGenre);
    };
    deleteGenre = async (id) => {
        const resp = await genero_model_1.Genero.destroy({ where: { id } });
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('No existe el género'), { statusCode: 400 });
        }
    };
    updateGenre = async (id, genre) => {
        const resp = await genero_model_1.Genero.update(genre, { where: { id } });
        if (resp[0] === 0) {
            throw (0, boom_1.boomify)(new Error('No existe el género'), { statusCode: 400 });
        }
    };
    findAllGenres = async () => {
        return await genero_model_1.Genero.findAll();
    };
    addMovieToGenre = async (idGenre, idMovie) => {
        const genre = await genero_model_1.Genero.findOne({ where: { id: idGenre } });
        const movie = await pelicula_model_1.Pelicula.findOne({ where: { id: idMovie } });
        if (!genre || !movie) {
            throw (0, boom_1.boomify)(new Error('El género o la pelicula, no existe'), { statusCode: 400 });
        }
        genre.addPelicula(movie);
    };
    findGenreByID = async (id) => {
        const resp = await genero_model_1.Genero.findOne({ where: { id } });
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('No existe el género'), { statusCode: 400 });
        }
        return resp;
    };
    removeMovieFromGenre = async (id, idMovie) => {
        const genre = await genero_model_1.Genero.findOne({ where: { id } });
        const movie = await pelicula_model_1.Pelicula.findOne({ where: { id: idMovie } });
        if (!genre || !movie) {
            throw (0, boom_1.boomify)(new Error('El género o la pelicula, no existe'), { statusCode: 400 });
        }
        const resp = await genre.removePelicula(movie);
        if (!resp) {
            throw (0, boom_1.boomify)(new Error('El género o la pelicula, no existe'), { statusCode: 400 });
        }
    };
}
exports.Service = Service;
