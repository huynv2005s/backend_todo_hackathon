import { Request, Response } from "express";
import { MemberService } from "./member.service";
import { AuthService } from "../auth/auth.service";

export const MemberController = {
    async addMember(req: Request, res: Response) {
        const { email } = req.body;
        const { id } = req.params;
        try {
            const user = await AuthService.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "Không tìm thấy người dùng này" });
            }
            const data = await MemberService.addMember({ userId: user.id, boardId: id });
            res.json({ message: "Đã gửi lời mời thành công", data });
        } catch (error) {
            return res.status(404).json({ error: "Có lỗi xảy ra, vui lòng thử lại" });

        }
    },
};
