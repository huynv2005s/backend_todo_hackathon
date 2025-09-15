"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const board_service_1 = require("./board.service");
const member_service_1 = require("../member/member.service");
exports.BoardController = {
    async getBoards(req, res) {
        const userId = req.query.userId;
        const boards = await board_service_1.BoardService.getAll(userId);
        res.json(boards);
    },
    async createBoard(req, res) {
        const { title, isPublic } = req.body;
        const { id } = req.user;
        console.log(title, isPublic);
        const { id: ownerId } = req.user;
        const board = await board_service_1.BoardService.create({ title, ownerId, isPublic });
        await member_service_1.MemberService.addOwner({ userId: id, boardId: board.id });
        res.json(board);
    },
    async getByUserId(req, res) {
        const { id } = req.user;
        const board = await board_service_1.BoardService.getByUserId(id);
        res.json(board);
    },
    async getById(req, res) {
        const { id } = req.params;
        const board = await board_service_1.BoardService.getById(id);
        res.json(board);
    }
};
//# sourceMappingURL=board.controller.js.map