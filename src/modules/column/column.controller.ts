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
        try {
            const { activeId, overId, activePosition, overPosition, userId } = req.body;

            if (!activeId || !overId || activePosition === undefined || overPosition === undefined) {
                return res.status(400).json({ error: "Missing required parameters" });
            }

            const updatedColumns = await ColumnService.moveColumn(
                activeId,
                overId,
                activePosition,
                overPosition,
                userId
            );

            res.json(updatedColumns);
        } catch (error) {
            console.error("Error moving column:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
