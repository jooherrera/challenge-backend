"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/index.js");
const routes_1 = require("./routes");
const middleware_1 = require("./middleware");
const _Utils_1 = require("./utils/index.js");
const sequelize_1 = require("./config/sequelize.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_1.router);
app.use(middleware_1.Mid.boomErrorHandler);
app.use(middleware_1.Mid.errorHandler);
app.listen(process.env.PORT, async () => {
    await (0, sequelize_1.connect)();
    (0, _Utils_1.logMsg)(`Serven ON --> PORT ${process.env.PORT}`);
});
