//IMPORTS
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');

//USE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(cors())
app.use(express.static("public"));


//Upraise server
let PORT = 3000;
app.listen(PORT, () => console.log(`corriendo en el puerto ${PORT}`));


app.use(express.static("public"));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const studentsRoutes = require("./src/routes/students.js")
const teacherRoutes = require('./src/routes/teachers.js')
const coursesRoutes = require("./src/routes/coursesRouter.js");
const subjectsRoutes = require("./src/routes/subjectsRouter.js");
const tasksRouter = require("./src/routes/tasksRouter.js");

//rutas
app.use('/api', coursesRoutes);
app.use('/api', subjectsRoutes);
app.use('/api', tasksRouter);
app.use('/students', studentsRoutes)
app.use('/teacher', teacherRoutes)


//Libreria EJS
app.set('views', './src/views')
app.set('view engine', 'ejs')

