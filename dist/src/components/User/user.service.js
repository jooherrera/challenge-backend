"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const nodemailer_1 = require("../../config/nodemailer.js");
const _Utils_1 = require("../../utils/index.js");
const user_model_1 = require("./user.model");
class UserService {
    constructor() { }
    async createUser(user, password, email) {
        const encryptedPassword = await (0, _Utils_1.encryptPassword)(password);
        await user_model_1.User.create({ user, password: encryptedPassword });
        const optionsUser = (0, nodemailer_1.mailOptionsToUser)(email, user);
        (0, nodemailer_1.sendAdminMail)(optionsUser);
    }
    async findUser(user, password) {
        const userFound = await user_model_1.User.findOne({ where: { user } });
        if (!userFound) {
            return '';
        }
        const encryptedPassword = userFound?.getDataValue('password');
        await (0, _Utils_1.checkPassword)(password, encryptedPassword);
        const userID = userFound.getDataValue('id');
        const token = await (0, _Utils_1.signToken)({ userID });
        return token;
    }
}
exports.UserService = UserService;
