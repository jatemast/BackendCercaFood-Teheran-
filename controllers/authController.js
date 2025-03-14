const authService = require('../services/authService');

const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const result = await authService.signup(name, email, password);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await authService.signin(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = authController;
