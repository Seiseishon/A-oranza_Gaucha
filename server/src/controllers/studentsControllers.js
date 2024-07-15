const sequelize = require('sequelize');
let { Students } = require('../database/models')

const studentsControllers = {
    list: async(req,res)=>{
        try {
            const studentsList = await Students.findAll({
                include: [{ association: 'subjects' }, { association: 'tasks' }]
            })

            const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students',
                    total: studentsList.length
                },
                data: studentsList
            }

            return res.status(200).json(dataStudents)

        } catch (error) {
            console.error('Error list:', error)
            res.status(500).json({error: "Server error"})
        }
    },
    
    search: async(req, res)=>{
        try {

            const studentsSearch = await Students.findByPk(req.params.id)

            const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students/detail/:id',
                    message: studentsSearch != null? 'Alumno encontrado': 'El alumno que quiere buscar no existe'
                },
                data: studentsSearch
            }

            return res.status(200).json(dataStudents)

        } catch (error) {
            console.error('Error search:', error)
            res.status(500).json({error: "Server error"})
        }
    },

    create: async(req,res)=>{
        try {

            const {
                user,
                password,
                name,
                last_name,
                email,
                dni,
                birthdate,
                id_course,
                subjects,
                id_task
            } = req.body

            const studentsCreate = await Students.create({
                user,
                password,
                name,
                last_name,
                email,
                dni,
                birthdate,
                id_course,
            })

            if (subjects && subjects.length > 0) {
                await studentsCreate.setSubjects(subjects); // Utiliza el método setCourses generado por Sequelize para asociar los cursos
            }

            const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students/create',
                    message: studentsCreate != null? 'El alumno fue creado con exito': 'Hubo un error al crear el alumno'
                },
                data: studentsCreate
            }

            return res.status(200).json(dataStudents)

        } catch (error) {
            console.error('Error creating student:', error)
            res.status(500).json({error: 'Server error'})
        }
    },

    delete: async (req, res) => {
        try {
            const studentsDelete = await Students.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students/delete/:id',
                    message: studentsDelete != 0 ? 'El alumno fue eliminado con éxito' : 'El alumno que quiere eliminar no existe'
                },
                data: studentsDelete
            };
    
            return res.status(200).json(dataStudents);
    
        } catch (error) {
            console.error('Error deleting student:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
    }


module.exports = studentsControllers;