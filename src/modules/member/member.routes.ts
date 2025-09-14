import { Router } from "express";
import { MemberController } from "./member.controller";

const router = Router();

router.post("/addMember/:id", MemberController.addMember);

export default router;
