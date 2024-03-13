//Підключаємо залежність express
var express = require("express");
//Підключаємо залежність body-parser
var bodyParser = require("body-parser");
//Викликаємо express
var app = express();
//Надаємо доступ до папки public
app.use(express.static("public"));
//Вмикаємо body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//Налаштовуємо обробник шаблонів
app.set("view engine", "ejs");

//Визначаємо масив заповнювачів для доданих завдань
var task = ["Опанувати JavaScript", "Опанувати Node.js"];
//Визначаємо масив заповнювачів для виконаних завдань
var complete = ["Опанувати HTML та CSS", "Опанувати Git та Github"];

//Визначаємо маршрут публікації для додавання нового завдання
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //Додаємо нове завдання з маршруту публікації в масив
    task.push(newTask);
    //Після додавання до масиву повертаємося до кореневого маршруту
    res.redirect("/");
});

app.post("/movetask", function(req, res) {
    var completeTask = req.body.check;
    //Перевіряємо наявність "typeof" іншого завершеного завдання, а потім додаємо його до завершеного завдання
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //Перевіряємо, чи відмічене як виконане завдання вже виходить у виконані завдання, а потім переміщуємо його
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//Відображаємо ejs і додане завдання
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});

//Налаштовуємо сервер для прослуховування порту 3000
app.listen(3000, function() {
    console.log("Сервер працює на порту 3000!");
});
