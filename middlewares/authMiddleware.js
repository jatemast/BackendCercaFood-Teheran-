const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraemos el token del encabezado 'Authorization'

  if (!token) {
    return res.status(401).json({ error: "Token de autenticación no proporcionado." });
  }

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos el objeto decodificado en 'req.user'
    next(); // Continuamos con el flujo hacia el siguiente middleware o controlador
  } catch (error) {
    console.error("❌ Error decodificando el token:", error);
    res.status(403).json({ error: "Token no válido." });
  }
};

module.exports = authMiddleware;
