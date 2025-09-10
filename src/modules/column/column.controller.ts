import { Request, Response } from "express";
import { ColumnService } from "./column.service";

export const ColumnController = {
    async createColumn(req: Request, res: Response) {
        const { boardId, title } = req.body;
        const column = await ColumnService.create(boardId, title);
        res.json(column);
    },
    async findAll(req: Request, res: Response) {
        const columns = await ColumnService.findAll();
        res.json(columns);
    },

    async updateColumnOrder(req: Request, res: Response) {
        const { id } = req.params;
        const { order } = req.body;
        const column = await ColumnService.updateOrder(id, order);
        res.json(column);
    },
    async moveColumn(req: Request, res: Response) {
        const { activeId, overdId, activePosition, overPosition } = req.body;
        const column = await ColumnService.moveColumn(activeId, overdId, activePosition, overPosition);
        res.json(column);
    }
};
