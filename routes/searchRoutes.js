const express = require("express");
const router = express.Router();
const searchService = require("../services/searchService");

// ✅ Ruta de prueba para verificar que el servidor responde
router.get("/test", (req, res) => {
    res.json({ message: "✅ Ruta de prueba funcionando correctamente" });
});

router.get("/search", async (req, res) => {
    try {
        const { lat, lng } = req.query;
        if (!lat || !lng) {
            return res.status(400).json({ error: "Faltan parámetros lat y lng" });
        }

        const results = await searchService.searchPlaces(null, lat, lng);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
