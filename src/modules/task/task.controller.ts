import { Request, Response } from "express";
import { TaskService } from "./task.service";

export const TaskController = {
    async createTask(req: Request, res: Response) {
        const { columnId, title } = req.body;
        const task = await TaskService.create(columnId, title);
        res.json(task);
    },

    async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { title, order, columnId } = req.body;
        const task = await TaskService.update({ id, title, order, columnId });
        res.json(task);
    },

    async deleteTask(req: Request, res: Response) {
        const { id } = req.params;
        await TaskService.delete(id);
        res.json({ success: true });
    },
    async getAllTasks(req: Request, res: Response) {
        const tasks = await TaskService.findAll();
        res.json(tasks);
    },
    async moveTask(req: Request, res: Response) {
        const tasks = await TaskService.findAll();
        res.json(tasks);
    }
};
