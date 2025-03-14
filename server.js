const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const historyRoutes = require('./routes/historyRoutes');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// Configurar CORS
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // 🔹 QUITÉ LA COMILLA EXTRA
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // 🔹 AGREGA ESTO SI USAS AUTENTICACIÓN CON COOKIES
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Verifica que las rutas se registren correctamente
console.log("🚀 Verificando rutas registradas...");
console.log(searchRoutes.stack.map(r => r.route ? r.route.path : "Middleware"));

// Registrar rutas
app.use('/api', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', historyRoutes); 

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('📌 Conectado a la base de datos');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
}).catch(err => console.error('❌ Error al conectar a la base de datos:', err));
