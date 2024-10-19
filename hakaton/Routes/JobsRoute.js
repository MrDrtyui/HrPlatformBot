const db = require("../db");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm || ''; // Извлекаем параметр из строки запроса
        const regionId = req.query.regionId || ''; // Извлекаем параметр regionId
        const typeId = req.query.typeId || ''; // Извлекаем параметр typeId

        console.log("Полученный searchTerm:", searchTerm); // Логируем searchTerm
        console.log("Полученный regionId:", regionId); // Логируем regionId
        console.log("Полученный typeId:", typeId); // Логируем typeId

        const query = `
            SELECT 
                Jobs.id, 
                Users.Username,
                Type.Name AS TypeName,
                Region.Name AS RegionName,
                Duration.Name AS DurationName,
                Jobs.Title,
                Jobs.PhonenNumber,
                Jobs.Description,
                Jobs.CreatedAt
            FROM 
                Jobs
            INNER JOIN 
                Users ON Users.id = Jobs.EmployerId
            INNER JOIN 
                Type ON Type.id = Jobs.TypeId
            INNER JOIN 
                Duration ON Duration.id = Jobs.DurationId
            INNER JOIN 
                Region ON Region.id = Jobs.RegionId
            WHERE 
                Jobs.IsActive = 1 AND (
                    Jobs.Title LIKE ? OR
                    Type.Name LIKE ? OR
                    Region.Name LIKE ? OR
                    Duration.Name LIKE ? OR
                    Jobs.Description LIKE ? OR
                    Jobs.CreatedAt LIKE ?
                )
                AND (Region.id = ? OR ? = '') 
                AND (Type.id = ? OR ? = '');
        `;

        // Подготовьте параметры для всех условий LIKE и ID
        const searchParams = [
            `%${searchTerm}%`, // Для Jobs.Title
            `%${searchTerm}%`, // Для Type.Name
            `%${searchTerm}%`, // Для Region.Name
            `%${searchTerm}%`, // Для Duration.Name
            `%${searchTerm}%`, // Для Jobs.Description
            `%${searchTerm}%`, // Для Jobs.CreatedAt
            regionId,         // Для Region.id
            regionId,         // Для проверки regionId
            typeId,           // Для Type.id
            typeId            // Для проверки typeId
        ];

        console.log("Параметры для запроса:", searchParams); // Логируем параметры

        const [rows] = await db.query(query, searchParams);
        console.log("Результаты запроса:", rows); // Логируем результаты
        res.json(rows);
    } catch (error) {
        console.error("Ошибка выполнения запроса:", error);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});




// Контроллер для получения вакансии по id
router.get("/:id", async (req, res) => {
    try {
        const jobId = req.params.id; // Извлекаем id вакансии из параметров URL

        console.log("Полученный jobId:", jobId); // Логируем jobId

        const query = `
            SELECT 
                Jobs.id, 
                Users.Username,
                Type.Name AS TypeName,
                Region.Name AS RegionName,
                Duration.Name AS DurationName,
                Jobs.Title,
                Jobs.PhonenNumber,
                Jobs.Description,
                Jobs.CreatedAt
            FROM 
                Jobs
            INNER JOIN 
                Users ON Users.id = Jobs.EmployerId
            INNER JOIN 
                Type ON Type.id = Jobs.TypeId
            INNER JOIN 
                Duration ON Duration.id = Jobs.DurationId
            INNER JOIN 
                Region ON Region.id = Jobs.RegionId
            WHERE 
                Jobs.IsActive = 1 AND 
                Jobs.id = ?;
        `;

        // Выполняем запрос с параметром jobId
        const [rows] = await db.query(query, [jobId]);

        console.log("Результаты запроса:", rows); // Логируем результаты

        if (rows.length > 0) {
            res.json(rows[0]); // Возвращаем первую запись
        } else {
            res.status(404).json({ error: "Вакансия не найдена" }); // Если запись не найдена
        }
    } catch (error) {
        console.error("Ошибка выполнения запроса:", error);
        res.status(500).json({ error: "Ошибка при получении данных" });
    }
});






module.exports = router;

