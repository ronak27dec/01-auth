import { Router } from "express";
import * as authController from "./../controller/auth.controller.js";

export const authRouter = Router();

/**
 * POST: /v1/api/auth/register
 */
authRouter.post("/register", authController.registerUser);

/**
 * POST /v1/api/auth/getMe
 */
authRouter.post("/getMe", authController.getMe);
