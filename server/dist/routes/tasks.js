"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskControllers_1 = require("../controller/taskControllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.authMiddleware);
router.get('/', taskControllers_1.getAllTasks);
router.get('/:id', taskControllers_1.getTaskById);
router.post('/', taskControllers_1.createTask);
router.delete('/:id', taskControllers_1.deleteTask);
router.patch('/:id', taskControllers_1.updateTask);
exports.default = router;
