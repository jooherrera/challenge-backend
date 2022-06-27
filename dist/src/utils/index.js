"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.checkPassword = exports.encryptPassword = exports.logMsg = exports.logError = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_1 = require("util");
const boom_1 = require("@hapi/boom");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const red = '\x1b[31m%s\x1b[0m';
const blue = '\x1b[34m%s\x1b[0m';
const logError = (msg) => {
    console.log(red, msg);
};
exports.logError = logError;
const logMsg = (msg) => {
    console.log(blue, msg);
};
exports.logMsg = logMsg;
const encryptPassword = async (password) => {
    const salt = Number(process.env.SALT) || 5;
    const hashPromise = (0, util_1.promisify)(bcrypt_1.default.hash);
    return await hashPromise(password, salt);
};
exports.encryptPassword = encryptPassword;
const checkPassword = async (password, encryptedPassword) => {
    const decodePromise = (0, util_1.promisify)(bcrypt_1.default.compare);
    const resp = await decodePromise(password, encryptedPassword);
    if (!resp) {
        const err = new Error('Usuario o contraseña incorrecto');
        throw (0, boom_1.boomify)(err, { statusCode: 401 });
    }
    return true;
};
exports.checkPassword = checkPassword;
const signToken = async (payload) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRET, { expiresIn: process.env.EXP_TIME }, (err, token) => {
            if (err)
                return reject(err);
            if (token)
                return resolve(token);
            return reject('No se generó el token');
        });
    });
};
exports.signToken = signToken;
const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decoded) => {
            if (err)
                return reject((0, boom_1.boomify)(new Error(err.message), { statusCode: 401 }));
            if (typeof decoded === 'undefined')
                return reject((0, boom_1.boomify)(new Error('No se pudo decodificar el token'), { statusCode: 401 }));
            if (typeof decoded === 'string')
                return reject((0, boom_1.boomify)(new Error('No se pudo decodificar el token'), { statusCode: 401 }));
            return resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
