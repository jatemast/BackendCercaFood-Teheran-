const searchService = require('../services/searchService');

const searchController = async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const userId = req.user ? req.user.id : "anonimo"; // Si no hay user, asignar "anonimo"

        console.log("📍 Latitud recibida:", lat, "Longitud recibida:", lng);

        const results = await searchService.searchPlaces(userId, lat, lng);

        console.log("🍽️ Restaurantes enviados al frontend:", results.length);

        return res.json(results);
    } catch (error) {
        console.error("❌ Error en searchController:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { searchController };
