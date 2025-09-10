import { Request, Response } from "express";
import { BoardService } from "./board.service";

export const BoardController = {
    async getBoards(req: Request, res: Response) {
        const userId = req.query.userId as string;
        const boards = await BoardService.getAll(userId);
        res.json(boards);
    },

    async createBoard(req: Request, res: Response) {
        const { title, ownerId } = req.body;
        const board = await BoardService.create({ title, ownerId });
        res.json(board);
    },

    async getBoard(req: Request, res: Response) {
        const { id } = req.params;
        const board = await BoardService.getById(id);
        res.json(board);
    }
};
