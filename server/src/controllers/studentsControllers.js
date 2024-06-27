let db = require('../database/models')

let studentsControllers = {
    create: function(req,res){
        db.Courses.findAll()
            .then(function(courses){
                return res.render('listStudents.ejs', {courses:courses})
            })
    }
}


module.exports = studentsControllers;