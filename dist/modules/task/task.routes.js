"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const router = (0, express_1.Router)();
router.get("/", task_controller_1.TaskController.getAllTasks);
router.get("/getTaskByUserId", task_controller_1.TaskController.getTaskByUserId);
router.post("/", task_controller_1.TaskController.createTask);
router.patch("/:id", task_controller_1.TaskController.updateTask);
router.delete("/:id", task_controller_1.TaskController.deleteTask);
exports.default = router;
//# sourceMappingURL=task.routes.js.map