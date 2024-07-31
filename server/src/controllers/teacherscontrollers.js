const sequelize = require('sequelize');
const { Teachers } = require('../database/models');
const { Op } = require('sequelize');

const teacherscontrollers = {
    list: async (req, res)=>{
        try {

            const includes = {
                include: [{ association: 'subjects' }, 
                          { association: 'courses' }]
            };

            const teacher = await Teachers.findAll(includes);

            const dataTeacher = {
                meta: {
                    status: 200,
                    total: teacher.length,
                    URL: '/teacher'
                },
                data: teacher
            };

    return res.status(200).json(dataTeacher);

        } catch (error) {
            console.error('Error list:', error);
    return res.status(500).json({ error: 'Server error' });
        }
        
    },
    searchByName: async(req,res)=>{
        try {

            const includes = {
                include: [{ association: 'subjects' }, 
                          { association: 'courses' }]
            };

            const keyword = req.query.keyword || '';

             const teacherByName = await Teachers.findAll({
                where:{
                    name: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
             });

        const dataTeacher = {
            meta: {
                status: 200,
                URL: '/teacher/search',
                message: teacherByName.length != 0?  teacherByName.length + ' Profe(s) encontrado(s)': 'El profesor que busca no existe'
            },
            data: teacherByName
        };

        return res.status(200).json(dataTeacher);

    }
         catch (error) {
            console.error('Error search:', error);
        return res.status(500).json({ error: 'server error' });
        }
    },

    searchByPk: async (req, res) => {
        try {
            const includes = {
                include: [ { association: "subjects" },
                           { association: 'courses' }
                         ]};

            const {id} = req.params;

            const teacherByPk = await Teachers.findByPk(id,includes);
            
            const dataTeacher = {
                meta: {
                    status: 200,
                    URL: `/teacher/search/:id`,
                    message: teacherByPk != null? 'Profesor encontrado' : 'El Profesor no existe'
                },

                data: teacherByPk
            };

           return res.status(200).json(dataTeacher);   
            
        }catch(error){
            console.error(error);
           return res.status(500).json( { error: 'Server error' } );
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
                await teacherCreate.setSubjects(subjects);
            }
    
            // Preparar la respuesta JSON
            const dataTeacher = {
                meta: {
                    status: 201,
                    URL: '/teacher/create'
                },
                data: teacherCreate
            };
    
            return res.status(201).json(dataTeacher);

        } catch (error) {
            console.error("Error creating teacher:", error);
            return res.status(500).json({ error: 'server error' });
        }
    },
    update: async (req,res)=>{
        try {
            const includes = {
                include: [{ association: 'subjects' }, 
                          { association: 'courses' }]
            };

            const {user,
            password,
            name,
            last_name,
            email,
            dni,
            birthdate,
            courses, // Suponiendo que los cursos a asociar están en el body de la solicitud
            subjects} = req.body;

            const id = req.params.id;

            const update = await Teachers.update({user,
                password,
                name,
                last_name,
                email,
                dni,
                birthdate,},{
                where: {id}
            });
            
            if(update){
                const teacherUpdate = await Teachers.findByPk(id,includes);

                const dataTeacher = {
                    meta: {
                        status: 202,
                        URL: '/teacher/update/:id'
                    },
                    data: teacherUpdate
                };
                // Si hay cursos asociados, asociarlos al profesor
            if (courses && courses.length > 0) {
                await teacherUpdate.setCourses(courses); // Utiliza el método setCourses generado por Sequelize para asociar los cursos
            }
            if(subjects && subjects.length > 0){
                await teacherUpdate.setSubjects(subjects);
            }

             return res.status(202).json(dataTeacher);

            }
        } catch (error) {
            console.error('Error updating:', error);
            return res.status(500).json({error: 'server error'});
        }
    },

    delete: async(req,res)=>{
        try {

            const {id} = req.params;

             const teacherDelete = await Teachers.destroy({
                where: {id}
             });

        return res.status(204).json(teacherDelete);

    }
         catch (error) {
            console.error('Error deleting teacher:', error);
         return res.status(500).json({ error: 'server error' });
        }
    }
};


module.exports = {
    teacherscontrollers
};