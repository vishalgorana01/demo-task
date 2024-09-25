"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controller/authControllers");
const router = express_1.default.Router();
router.post('/register', authControllers_1.register);
router.post('/login', authControllers_1.login);
router.get('/verify', authControllers_1.verify);
exports.default = router;
