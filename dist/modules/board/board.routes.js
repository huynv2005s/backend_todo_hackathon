"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const board_controller_1 = require("./board.controller");
const router = (0, express_1.Router)();
router.get("/", board_controller_1.BoardController.getBoards);
router.get("/getOne/:id", board_controller_1.BoardController.getById);
router.post("/", board_controller_1.BoardController.createBoard);
router.get("/getByUerId", board_controller_1.BoardController.getByUserId);
exports.default = router;
//# sourceMappingURL=board.routes.js.map