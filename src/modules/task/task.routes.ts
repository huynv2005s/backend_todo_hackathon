import { Router } from "express";
import { TaskController } from "./task.controller";

const router = Router();

router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
