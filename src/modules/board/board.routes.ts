import { Router } from "express";
import { BoardController } from "./board.controller";

const router = Router();

router.get("/", BoardController.getBoards);
router.get("/getOne/:id", BoardController.getById);
router.post("/", BoardController.createBoard);
router.get("/getByUerId", BoardController.getByUserId);

export default router;
