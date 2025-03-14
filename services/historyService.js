const axios = require("axios");
const History = require("../models/History");

const historyService = {
  saveSearch: async (userId, lat, lng, query, restaurants) => {
    if (!userId) {
      console.error("❌ Error: userId no proporcionado.");
      return;
    }

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`);
      const locationName = response.data.results?.[0]?.formatted_address || "Lugar no encontrado";

      if (!Array.isArray(restaurants) || restaurants.length === 0) {
        console.error("❌ Error: No se proporcionaron restaurantes válidos.");
        return;
      }

      const restaurantList = restaurants.map(r => {
        if (!r.name || !r.vicinity) {
          console.warn("⚠️ Restaurante con información incompleta, se omitirá.");
          return null;
        }
        return `${r.name} (${r.vicinity}) - ${r.rating || "Sin calificación"}`;
      }).filter(Boolean).join("\n");

      if (!restaurantList) {
        console.error("❌ Error: No se pudo generar una lista válida de restaurantes.");
        return;
      }

      await History.create({
        user_id: userId,
        latitude: lat,
        longitude: lng,
        search_query: query,
        location_name: locationName,
        restaurant_list: restaurantList,
      });

      console.log("✅ Búsqueda y restaurantes guardados en historial correctamente.");
    } catch (error) {
      console.error("❌ Error al guardar búsqueda en historial:", error);
    }
  },

  getHistory: async (userId) => {
    try {
      const history = await History.findAll({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]],
      });

      return history;
    } catch (error) {
      console.error("❌ Error al obtener historial:", error);
      throw error;
    }
  },
};

module.exports = historyService;
