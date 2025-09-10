import { Router } from "express";
import { ColumnController } from "./column.controller";

const router = Router();

router.get("/", ColumnController.findAll);
router.post("/", ColumnController.createColumn);
router.patch("/:id/order", ColumnController.updateColumnOrder);
router.patch("/moveColumn", ColumnController.moveColumn);

export default router;
