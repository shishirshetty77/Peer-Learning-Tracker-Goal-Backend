// server/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    req.user = {
      id: user._id,
      groupId: user.groupId, 
    };

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = authMiddleware;