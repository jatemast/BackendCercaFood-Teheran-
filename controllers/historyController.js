const historyService = require("../services/historyService");

const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await historyService.getHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error("❌ Error obteniendo historial:", error);
    res.status(500).json({ error: "No se pudo obtener el historial." });
  }
};

const saveSearch = async (req, res) => {
  const { lat, lng, query, restaurants } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ error: "Usuario no autenticado." });
  }

  try {
    await historyService.saveSearch(userId, lat, lng, query, restaurants);
    res.status(201).json({ message: "Búsqueda guardada correctamente." });
  } catch (error) {
    console.error("❌ Error guardando búsqueda:", error);
    res.status(500).json({ error: "No se pudo guardar la búsqueda." });
  }
};

module.exports = { getHistory, saveSearch };
