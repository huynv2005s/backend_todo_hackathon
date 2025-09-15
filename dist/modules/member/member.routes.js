"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("./member.controller");
const router = (0, express_1.Router)();
router.post("/addMember/:id", member_controller_1.MemberController.addMember);
exports.default = router;
//# sourceMappingURL=member.routes.js.map