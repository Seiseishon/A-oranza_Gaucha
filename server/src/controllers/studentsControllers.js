const sequelize = require('sequelize');
let { Students } = require('../database/models')
const { Op } = require('sequelize')
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
    
    search: async (req, res) => {
        try {
            const keyword = req.query.keyword || ''; // Maneja el caso donde no hay keyword
            const studentsSearch = await Students.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
            });
    
            const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students/search',
                    message: studentsSearch.length > 0 ? studentsSearch.length +' Alumno(s) encontrado(s)' : 'El alumno que quiere buscar no existe'
                },
                data: studentsSearch
            };
    
            return res.status(200).json(dataStudents);
        } catch (error) {
            console.error('Error search:', error);
            return res.status(500).json({ error: "Server error" });
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

    update: async(req,res)=>{
        try {
            const id = req.params.id
            const updateData = req.body
            const update = await Students.update(updateData,{
                where: {
                    id: id
                }
            })
            if(update){

                const studentUpdate = await Students.findByPk(id)

                 const dataStudents = {
                meta: {
                    status: 200,
                    URL: '/students/update/:id',
                },
                data: studentUpdate
            }

            return res.status(200).json(dataStudents)

            }
           
        } catch (error) {
            console.error('Error updating: ', error)
            res.status(500).json({ error: "Server error" })
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