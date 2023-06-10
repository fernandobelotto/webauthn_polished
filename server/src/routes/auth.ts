import { Router } from "express";
import {
  authOptions,
  authVerify,
} from "../core/auth";
import {
  registerOptions,
} from "../core/registerOptions";
import {
  registerVerify,
} from "../core/registerVerify";

export const authRoutes = Router();

authRoutes.post("/register-options", registerOptions);

authRoutes.post("/register-verify", registerVerify);

authRoutes.post("/auth-options", authOptions);

authRoutes.post("/auth-verify", authVerify);
