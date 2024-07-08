const sequelize = require('sequelize');
let { Students } = require('../database/models')

let studentsControllers = {
    create: async (req,res)=>{
        try {    
            const allData = await Students.findAll()
            const dataStudent = {
                meta: {
                    status:200,
                    URL: "/students/create"
                },
                data: allData
            }

            res.status(200).json(dataStudent)


        } catch (error) {
            res.status(500).json({error: "server error"})
        }
    }
}


module.exports = studentsControllers;