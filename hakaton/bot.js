const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('7061452915:AAFqgAOwFiq_Oa0f4JV1eHlV8wuXaO_AzHw');



bot.command('start', (ctx) => {
    const userId = ctx.from.id; // Получаем ID пользователя
    const username = ctx.from.username || 'неизвестный'; // Получаем никнейм пользователя (если он не установлен, используем 'неизвестный')

    // Формируем URL с параметрами
    const viewJobsUrl = `https://google.com`;
    const createJobUrl = `https://google.com?userId=${userId}&username=${username}`;

    ctx.reply(
        'Добро пожаловать! Это платформа для поиска вакансий по всему Казахстану',
        Markup.keyboard([
            [
                Markup.button.webApp('Просмотреть вакансии', viewJobsUrl), // Передаем userId и username
                Markup.button.webApp('Создать вакансию', createJobUrl) // Передаем userId и username
            ]
        ])
            .oneTime()
            .resize()
    );
});


// Запуск бота
bot.launch().then(() => {
    console.log('Bot is running...');
}).catch((err) => {
    console.error('Error launching bot:', err);
});
