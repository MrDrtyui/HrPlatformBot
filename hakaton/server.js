const express = require('express');
const connectToDatabase = require('./db');
const bot = require('./bot');

const jobRoutes = require("./Routes/JobsRoute");
const typeRoute = require("./Routes/TypeRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api/jobs',jobRoutes)
app.use('/api/type',typeRoute)



app.get("/", async (req, res) => {
    try {
        console.log(req.query);
        res.send("-_-")
    } catch (err) {res.error(err.stack);}
})

// app.get('/init', async (req, res) => {
//     const userAgent = req.query.userAgent;
//
//     if (userAgent && userAgent.includes('Telegram')) {
//         const userId = req.query.userId; // Получаем ID пользователя из параметров
//         const username = req.query.username; // Получаем никнейм пользователя из параметров
//
//         try {
//             // Выполняем запрос для добавления данных в таблицу InitUser
//             const [result] = await db.query(
//                 `INSERT INTO InitUser (_init_id, _init_Username) VALUES (?, ?)`,
//                 [userId, username]
//             );
//
//             res.send(`Данные пользователя получены и сохранены в базе данных`);
//         } catch (error) {
//             console.error("Ошибка при вставке данных:", error);
//             res.status(500).send("Ошибка при сохранении данных в базе.");
//         }
//     } else {
//         res.status(403).send("Доступ запрещен.");
//     }
// });



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
