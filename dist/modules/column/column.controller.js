"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnController = void 0;
const column_service_1 = require("./column.service");
exports.ColumnController = {
    async createColumn(req, res) {
        const { boardId, title } = req.body;
        const column = await column_service_1.ColumnService.create(boardId, title);
        res.json(column);
    },
    async findAll(req, res) {
        const columns = await column_service_1.ColumnService.findAll();
        res.json(columns);
    },
    async updateColumnOrder(req, res) {
        const { id } = req.params;
        const { order } = req.body;
        const column = await column_service_1.ColumnService.updateOrder(id, order);
        res.json(column);
    },
    async moveColumn(req, res) {
        try {
            const { activeId, overId, activePosition, overPosition, userId } = req.body;
            if (!activeId || !overId || activePosition === undefined || overPosition === undefined) {
                return res.status(400).json({ error: "Missing required parameters" });
            }
            const updatedColumns = await column_service_1.ColumnService.moveColumn(activeId, overId, activePosition, overPosition, userId);
            res.json(updatedColumns);
        }
        catch (error) {
            console.error("Error moving column:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
//# sourceMappingURL=column.controller.js.map