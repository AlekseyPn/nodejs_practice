const path = require("path");

// имя файла
console.log(path.basename(__filename));
// директория в которой лежит файл
console.log(path.dirname(__filename));
//расширение файла
console.log(path.extname(__filename));
//парсинг пути возвращает объект со всем что выше выводилось по одному
console.log(path.parse(__filename));
// создает путь до файла соединяя строки в правильный путь
console.log(path.join(__dirname, "..", "index.js"));
// отличие между этим и методом ниже в том что он создает корректный путь как для относительных так и для абсолютных путей
console.log(path.resolve(__dirname, "..", "index.js"));