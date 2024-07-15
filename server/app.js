//IMPORTS

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const studentsRoutes = require("./src/routes/students.js")
const teacherRoutes = require('./src/routes/teachers.js')
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

//Libreria EJS
app.set('views', './src/views')
app.set('view engine', 'ejs')

//rutas
app.use('/students', studentsRoutes)
app.use('/teacher', teacherRoutes)
