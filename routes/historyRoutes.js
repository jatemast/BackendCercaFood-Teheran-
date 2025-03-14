const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const historyController = require("../controllers/historyController");

const router = express.Router();

router.get("/history", authMiddleware, historyController.getHistory);
router.post("/history", authMiddleware, historyController.saveSearch);

module.exports = router;
