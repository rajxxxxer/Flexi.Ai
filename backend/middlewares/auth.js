import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();
    const user = await clerkClient.users.getUser(userId);

    // Premium check using metadata (temporary until feature flag is set)
    const hasPremiumPlan = user.privateMetadata?.premium === true;

    // Free usage only for non-premium users
    if (!hasPremiumPlan) {
      req.free_usage = user.privateMetadata?.free_usage || 0;
    } else {
      req.free_usage = null; // premium users ka free_usage irrelevant
    }

    req.plan = hasPremiumPlan ? "premium" : "free";
    req.userId = userId;

    console.log("Auth Middleware Result:", { userId: req.userId, plan: req.plan, free_usage: req.free_usage });

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
