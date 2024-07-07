const { Association } = require('sequelize');
let db = require('../database/models')

let studentsControllers = {
    studentAll: async (req,res)=>{
        try {
            const data = await db.Students.findAll({
                include: [{Association: "courses"}, {Association: "tasks"}]
            })
            
            const datastudent = {
                meta:{
                    status: 200,
                    URL: "/create"
                },
                data: data
            }

            res.status(200).json(datastudent)
            
        } catch (error) {
            console.log(error);
            res.status(500).json({error:"server error"})      
        }
    }
}


module.exports = studentsControllers;