import { Router } from "express";
import { ColumnController } from "./column.controller";

const router = Router();

router.post("/", ColumnController.createColumn);
router.patch("/:id/order", ColumnController.updateColumnOrder);

export default router;
