const sequelize = require('sequelize');
let { Students } = require('../database/models');
const { Op } = require('sequelize');

const studentsControllers = {
    list: async(req,res)=>{
        try {
            const studentsList = await Students.findAll({
                include: [{ association: 'subjects' }, 
                          { association: 'tasks' }]
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
            return res.status(500).json({error: "Server error"})
        }
    },
    
    searchByName: async (req, res) => {
        try {
            const includes = {
                include: [ { association: "subjects" },
                           { association: 'tasks' }
                         ]};

            const keyword = req.query.keyword || ''; // Maneja el caso donde no hay keyword
            const studentsByName = await Students.findAll({
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
                    message: studentsByName.length > 0 ? studentsByName.length +' Alumno(s) encontrado(s)' : 'El alumno que quiere buscar no existe'
                },
                data: studentsByName
            };
    
            return res.status(200).json(dataStudents);
        } catch (error) {
            console.error('Error search:', error);
            return res.status(500).json({ error: "Server error" });
        }
    },

    searchByPk: async (req, res) => {
        try {
            const includes = {
                include: [ { association: "subjects" },
                           { association: 'tasks' }
                         ]}

            const id = req.params.id

            const studentByPk = await Students.findByPk(id,includes);
            
            const dataStudents = {
                meta: {
                    status: 200,
                    URL: `/student/search/:id`,
                    message: studentByPk != null? 'Alumno encontrado' : 'El Alumno no existe'
                },

                data: studentByPk
            }

           return res.status(200).json(dataStudents)   
            
        }catch(error){
            console.error(error);
           return res.status(500).json( { error: 'Server error' } );
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
                tasks
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
            if (tasks && tasks.length > 0) {
                await studentsCreate.setTasks(tasks);
            }

            const dataStudents = {
                meta: {
                    status: 201,
                    URL: '/students/create'
                },
                data: studentsCreate
            }

            return res.status(201).json(dataStudents)

        } catch (error) {
            console.error('Error creating student:', error)
            return res.status(500).json({error: 'Server error'})
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
                    status: 202,
                    URL: '/students/update/:id',
                },
                data: studentUpdate
            }

            return res.status(202).json(dataStudents)

            }
           
        } catch (error) {
            console.error('Error updating: ', error)
            return res.status(500).json({ error: "Server error" })
        }
    },

    delete: async (req, res) => {
        try {

            const {id} = req.params;

            const studentsDelete = await Students.destroy({
                where: {id}
            });
    
            return res.status(204).json(studentsDelete);
    
        } catch (error) {
            console.error('Error deleting student:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
    }


module.exports = studentsControllers;
