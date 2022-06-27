"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const boom_1 = require("@hapi/boom");
class UserController {
    service;
    constructor(service) {
        this.service = service;
    }
    register = async (req, res, next) => {
        try {
            const { user, password, email } = req.body;
            await this.service.createUser(user, password, email);
            res.sendStatus(201);
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return next((0, boom_1.boomify)(new Error('Usuario o contraseña incorrecto'), { statusCode: 401 }));
            }
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const { user, password } = req.body;
            const token = await this.service.findUser(user, password);
            if (!token) {
                const err = new Error('Usuario o contraseña incorrecto');
                throw (0, boom_1.boomify)(err, { statusCode: 401 });
            }
            res.status(200).json({ token: `Bearer ${token}` });
        }
        catch (error) {
            next(error);
        }
    };
    dashboard = async (req, res, next) => {
        res.sendStatus(200);
    };
}
exports.UserController = UserController;
