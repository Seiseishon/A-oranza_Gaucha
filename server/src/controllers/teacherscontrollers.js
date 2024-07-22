const sequelize = require('sequelize');
const { Teachers } = require('../database/models');
const { Op } = require('sequelize');
const { update } = require('./studentsControllers');

const teacherscontrollers = {
    list: async (req, res)=>{
        try {
            const teacher = await Teachers.findAll({
                include: [{association: 'subjects'}, {association: 'courses'}]
            })

            const dataTeacher = {
                meta: {
                    status: 200,
                    total: teacher.length,
                    URL: '/teacher'
                },
                data: teacher
            }
    return res.status(200).json(dataTeacher)
        } catch (error) {
            console.error('Error list:', error)
            res.status(500).json({ error: 'Server error' })
        }
        
    },
    search: async(req,res)=>{
        try {
            const keyword = req.query.keyword || '';

             const teacherSearch = await Teachers.findAll({
                where:{
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
             })

        const dataTeacher = {
            meta: {
                status: 200,
                URL: '/teacher/search',
                message: teacherSearch.length != 0?  teacherSearch.length + ' Profe(s) encontrado(s)': 'El profesor que busca no existe'
            },
            data: teacherSearch
        }
        return res.status(200).json(dataTeacher)
    }
         catch (error) {
            console.error('Error search:', error)
            res.status(500).json({ error: 'server error' })
        }
    },
    create: async (req, res) => {
        const {
            user,
            password,
            name,
            last_name,
            email,
            dni,
            birthdate,
            courses, // Suponiendo que los cursos a asociar están en el body de la solicitud
            subjects
        } = req.body;
    
        try {
            // Crear el profesor en la tabla Teachers
            const teacherCreate = await Teachers.create({
                user,
                password,
                name,
                last_name,
                email,
                dni,
                birthdate
            });
    
            // Si hay cursos asociados, asociarlos al profesor
            if (courses && courses.length > 0) {
                await teacherCreate.setCourses(courses); // Utiliza el método setCourses generado por Sequelize para asociar los cursos
            }
            if(subjects && subjects.length > 0){
                await teacherCreate.setSubjects(subjects)
            }
    
            // Preparar la respuesta JSON
            const dataTeacher = {
                meta: {
                    status: 200,
                    URL: '/teacher/create'
                },
                data: teacherCreate
            };
    
            return res.status(200).json(dataTeacher);
        } catch (error) {
            console.error("Error creating teacher:", error);
            return res.status(500).json({ error: 'server error' });
        }
    },
    update: async (req,res)=>{
        try {
            const id = req.params.id;
            const updateData = req.body;

            const update = await Teachers.update(updateData,{
                where: {
                    id: id
                }
            })

            if(update){
            const teacherUpdate = await Teachers.findByPk(id)

            const dataTeacher ={
                meta: {
                    status: 200,
                    URL: '/teacher/update/:id',
                    message: 'Actualizacion exitosa'
                },
                data: teacherUpdate
            }

            return res.status(200).json(dataTeacher)

            }
        } catch (error) {
            console.error('Error updating:', error)
            res.status(500).json({error: "Server error"})
        }
    },

    partialUpdate: async(req,res)=>{
        try {
            const id = req.params.id;
            const updateData = req.body

            const update = await Teachers.update(updateData,{
                where:{
                    id: id
                }
            })

            if(update){
                const teacherPartialUpdate = await Teachers.findByPk(id)

                const dataTeacher = {
                    meta: {
                        status: 200,
                        URL: `/teacher/update/:id`,
                        message: 'Profesor actualizado parcialmente con exito'
                    },
                    data: teacherPartialUpdate
                }

                return res.status(200).json(dataTeacher)

            }

        } catch (error) {
            console.error('Error updating:', error)
            res.status(500).json({error: "Server error"})
        }
    },

    delete: async(req,res)=>{
        try {
             const teacherDelete = await Teachers.destroy({
                where: {
                    id: req.params.id
                }
             })

          const dataTeacher = {
            meta: {
                status: 200,
                URL: '/teacher/delete/:id',
                message: teacherDelete != 0? 'El profesor fue eliminado con exito': 'Hubo un error al querer eliminar'
            },
            data: teacherDelete
        }
        return res.status(200).json(dataTeacher)
    }
         catch (error) {
            console.error('Error deleting teacher:', error)
            res.status(500).json({ error: 'server error' })
        }
    }
}


module.exports = {
    teacherscontrollers
}