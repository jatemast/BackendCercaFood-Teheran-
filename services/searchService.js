require('dotenv').config();
const axios = require("axios");
const historyService = require("./historyService"); // Importar el servicio de historial

console.log("🛠️ searchService.js cargado correctamente");

async function searchPlaces(userId, lat, lng) {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("🔴 Falta la API Key de Google en el archivo .env");
        }

        const radius = 1550; // 🔥 Establecemos el radio a 1550 metros
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${apiKey}`;
        console.log("🌍 URL de Google Places:", url);

        const response = await axios.get(url);
        const results = response.data.results || [];

        // 🔹 Guardar búsqueda en la base de datos automáticamente
        await historyService.saveSearch(userId, lat, lng, "restaurantes");

        return results;
    } catch (error) {
        console.error("❌ Error al obtener lugares:", error.message);
        throw new Error("Error al buscar lugares");
    }
}

module.exports = { searchPlaces };
