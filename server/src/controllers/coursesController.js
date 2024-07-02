const sequelize = require('sequelize');
const { Courses } = require('../database/models');

module.exports = {
    allCourses: async (req, res) => {
        try {
            const data = await Courses.findAll();

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

    findCourse: async (req, res) => {
        try {
            const data = await Courses.findByPk(req.params.id, {
                include: [ { association: "students" }, { association: "subjects"} ]
            });

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