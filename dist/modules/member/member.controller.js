"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const member_service_1 = require("./member.service");
const auth_service_1 = require("../auth/auth.service");
exports.MemberController = {
    async addMember(req, res) {
        const { email } = req.body;
        const { id } = req.params;
        try {
            const user = await auth_service_1.AuthService.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng này" });
            }
            const data = await member_service_1.MemberService.addMember({ userId: user.id, boardId: id });
            res.json({ message: "Đã gửi lời mời thành công", data });
        }
        catch (error) {
            return res.status(404).json({ error: "Có lỗi xảy ra, vui lòng thử lại" });
        }
    },
};
//# sourceMappingURL=member.controller.js.map