"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userNetwork = void 0;
const express_1 = require("express");
const _Config_1 = require("../../config/index.js");
const _Middlewares_1 = require("../../middleware/index.js");
exports.userNetwork = (0, express_1.Router)();
exports.userNetwork.post('/auth/register', _Config_1.userController.register);
exports.userNetwork.post('/auth/login', _Config_1.userController.login);
exports.userNetwork.get('/dashboard', _Middlewares_1.Mid.obtainTokenFromHeader, _Config_1.userController.dashboard);
