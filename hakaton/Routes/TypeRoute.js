const db = require("../db");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let query = 'SELECT * FROM Type';

        // Выполнение запроса
        const [rows] = await db.query(query);

        // Возвращаем результат в формате JSON
        res.json(rows);
    } catch (error) {
        // Обработка ошибок
        console.error('Ошибка выполнения запроса:', error);
        res.status(500).json({ message: 'Ошибка сервера при получении данных' });
    }
});

module.exports = router;