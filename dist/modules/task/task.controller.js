"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("./task.service");
exports.TaskController = {
    async createTask(req, res) {
        const { columnId, title } = req.body;
        const task = await task_service_1.TaskService.create(columnId, title);
        res.json(task);
    },
    async updateTask(req, res) {
        const { id } = req.params;
        const { title, order, columnId } = req.body;
        const task = await task_service_1.TaskService.update({ id, title, order, columnId });
        res.json(task);
    },
    async deleteTask(req, res) {
        const { id } = req.params;
        await task_service_1.TaskService.delete(id);
        res.json({ success: true });
    },
    async getAllTasks(req, res) {
        const tasks = await task_service_1.TaskService.findAll();
        res.json(tasks);
    },
    async moveTask(req, res) {
        const tasks = await task_service_1.TaskService.findAll();
        res.json(tasks);
    },
    async getTaskByUserId(req, res) {
        const { id } = req.user;
        const tasks = await task_service_1.TaskService.findByUserId(id);
        res.json(tasks);
    }
};
//# sourceMappingURL=task.controller.js.map