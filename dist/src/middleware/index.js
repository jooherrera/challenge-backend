"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mid = void 0;
const boom_1 = require("@hapi/boom");
const _Utils_1 = require("../utils/index.js");
const boomErrorHandler = (error, req, res, next) => {
    if (error.isBoom) {
        const { output } = error;
        return res.status(output.statusCode).json(output.payload.message);
    }
    (0, _Utils_1.logError)(error);
    next(error);
};
const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        message: 'Hubo un error. Pronto lo estaremos resolviendo',
    });
};
const obtainTokenFromHeader = async (req, res, next) => {
    try {
        if (typeof req.headers['authorization'] === 'undefined') {
            return next((0, boom_1.boomify)(new Error('No se encontro el header con el token'), { statusCode: 401 }));
        }
        const header = req.headers['authorization'];
        const token = header.split(' ')[1];
        const data = await (0, _Utils_1.verifyToken)(token);
        req.user = data;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.Mid = { boomErrorHandler, errorHandler, obtainTokenFromHeader };
