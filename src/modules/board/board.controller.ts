import { Request, Response } from "express";
import { BoardService } from "./board.service";
import { MemberService } from "../member/member.service";

export const BoardController = {
    async getBoards(req: Request, res: Response) {
        const userId = req.query.userId as string;
        const boards = await BoardService.getAll(userId);
        res.json(boards);
    },

    async createBoard(req: Request, res: Response) {
        const { title, isPublic } = req.body;
        const { id } = req.user as any;
        console.log(title, isPublic);
        const { id: ownerId } = (req as any).user;
        const board = await BoardService.create({ title, ownerId, isPublic });
        await MemberService.addOwner({ userId: id, boardId: board.id })
        res.json(board);
    },
    async getByUserId(req: Request, res: Response) {
        const { id } = req.user as any;
        const board = await BoardService.getByUserId(id);
        res.json(board);
    },
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const board = await BoardService.getById(id);
        res.json(board);
    }
};
