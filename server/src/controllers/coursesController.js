const sequelize = require('sequelize');
const { Courses } = require('../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const includes = {
                include: [ { association: "students" }, 
                           { association: "subjects" } ]
            }
            const data = await Courses.findAll(includes);

            const dataCourses = {
                meta: {
                    status: 200,
                    URL: "/courses/all",
                    count: data.lenght
                },
                data: data.map((course) => {
                    return {
                        id: course.id,
                        course: course.name
                    }
                })
            }
            res.status(200).json(dataCourses)
        }catch(error){
            console.error(error);
            res.status(500).json( { error: 'Server error' } )
        }
    },

    search: async (req, res) => {
        try {

            const includes = {
                include: [ { association: "students" }, 
                           { association: "subjects" } ]
            }

            const data = await Courses.findByPk(req.params.id, includes);

            const dataCourse = {
                meta: {
                    status: 200,
                    URL: `/course/${req.params.id}`
                },

                data: data
            }
            res.status(200).json(dataCourse)

        }catch(error){
            console.error(error);
            res.status(500).json( { error: 'Server error' } );
        }
    }
}