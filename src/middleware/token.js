require("dotenv").config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

async function TokenCheck(req, res, next) {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }
    if (token === SECRET_TOKEN) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = TokenCheck;
