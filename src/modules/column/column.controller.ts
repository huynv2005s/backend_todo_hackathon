import { Request, Response } from "express";
import { ColumnService } from "./column.service";

export const ColumnController = {
    async createColumn(req: Request, res: Response) {
        const { boardId, title, position } = req.body;
        const column = await ColumnService.create({ boardId, title, position });
        res.json(column);
    },

    async updateColumnOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { order } = req.body;
        const column = await ColumnService.updateOrder(id, order);
        res.json(column);
    }
};
