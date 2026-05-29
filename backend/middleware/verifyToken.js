import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const auth = req.headers["authorization"];
    const token = auth && auth.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        req.admin = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ message: "Invalid or expired token" });
    }
}

export default verifyToken;