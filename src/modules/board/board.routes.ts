import { Router } from "express";
import { BoardController } from "./board.controller";

const router = Router();

router.get("/", BoardController.getBoards);
router.post("/", BoardController.createBoard);
router.get("/:id", BoardController.getBoard);

export default router;
