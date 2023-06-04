import { getUserById } from "../services/userServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) {
      return res.status(401).json({
        error: {
          message: "no token provided",
        },
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    // enviar al request el usuario
    req.user = decoded;

    const user = await getUserById(req.user.id);
    if (user) {
      next();
      return;
    }
    return res.status(400).json({
      error: {
        message: "User no found",
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        status: 500,
      },
      error: {
        message: "Server internal error",
        details: error.message,
      },
    });
  }
};



