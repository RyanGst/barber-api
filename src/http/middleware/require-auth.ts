import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { authClient } from "~/modules/auth/auth";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const testUserId = (req.headers["x-test-user-id"] || req.headers["X-Test-User-Id"]) as string | undefined;
    if (Bun.env.NODE_ENV === "test" && testUserId) {
      req.userId = String(testUserId);
      return next();
    }

    const session = await authClient.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = (session as any)?.session?.userId || (session as any)?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = String(userId);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
