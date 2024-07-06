let db = require('../database/models')

let studentsControllers = {
    studentAll: async (req,res)=>{
        const students = await db.Students.findAll()

        console.log(students);
    }
}


module.exports = studentsControllers;