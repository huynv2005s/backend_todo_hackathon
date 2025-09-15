"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const column_controller_1 = require("./column.controller");
const router = (0, express_1.Router)();
router.get("/", column_controller_1.ColumnController.findAll);
router.post("/", column_controller_1.ColumnController.createColumn);
router.patch("/:id/order", column_controller_1.ColumnController.updateColumnOrder);
router.patch("/moveColumn", column_controller_1.ColumnController.moveColumn);
exports.default = router;
//# sourceMappingURL=column.routes.js.map