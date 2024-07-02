const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(cors())

//Upraise server
let PORT = 3000;
app.listen(PORT, () => console.log(`corriendo en el puerto ${PORT}`));

app.use(express.static("public"));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const coursesRoutes = require("./src/routes/coursesRouter.js");
const subjectsRoutes = require("./src/routes/subjectsRouter.js");
const tasksRouter = require("./src/routes/tasksRouter.js");

//rutas
app.use('/api', coursesRoutes);
app.use('/api', subjectsRoutes);
app.use('/api', tasksRouter);