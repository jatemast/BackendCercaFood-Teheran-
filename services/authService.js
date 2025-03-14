require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Falta definir JWT_SECRET en el archivo .env");
    }

    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // Si manejas roles
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

const authService = {
    signup: async (name, email, password, role = "user") => {
        if (!name || !email || !password) {
            throw new Error("Todos los campos son obligatorios");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("El email no es válido");
        }

        email = email.toLowerCase();

        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("El usuario ya está registrado");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        const token = generateToken(newUser);

        return {
            message: "Usuario registrado correctamente",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        };
    },

    signin: async (email, password) => {
        if (!email || !password) {
            throw new Error("Email y contraseña son obligatorios");
        }

        email = email.toLowerCase();

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Contraseña incorrecta");
        }

        const token = generateToken(user);

        return {
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    },
};

module.exports = authService;
