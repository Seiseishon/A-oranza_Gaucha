const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Courses } = require('../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const includes = {
                include: [  
                            { association: 'subjects' },
                            { association: 'teachers' }
                 ]
            };
            const data = await Courses.findAll(includes);

            const dataCourse = {
                meta: {
                    status: 200,
                    URL: "/courses/all",
                    count: data.length
                },
                data: data
            };

           return res.status(200).json(dataCourse);

        }catch(error){
            console.error(error);
           return res.status(500).json( { error: 'Server error' } );
        }
    },

    searchByPk: async (req, res) => {
        try {
            const includes = {
                include: [ { association: "subjects" },
                           { association: 'teachers' }
                         ]};

            const {id} = req.params;

            const courseByPk = await Courses.findByPk(id,includes);
            
            const dataCourse = {
                meta: {
                    status: 200,
                    URL: `/course/search/:id`,
                    message: courseByPk != null? 'Curso encontrado' : 'El Curso no existe'
                },

                data: courseByPk
            };

           return res.status(200).json(dataCourse);   
            
        }catch(error){
            console.error(error);
           return res.status(500).json( { error: 'Server error' } );
        }
    },

    searchByName: async(req,res)=>{
        try {

            const keyword = req.query.keyword || '';

            const courseByName = await Courses.findAll({
                where: {
                    name:{[Op.like]: '%' + keyword + '%'}
                }
            });

            const dataCourse = {
                meta: {
                    status: 200,
                    URL: '/course/search',
                    message: courseByName.length > 0? courseByName.length + ' Curso(s) encontrado(s)' : 'No se encontró ningún curso'
                },
                data: courseByName
            };

           return res.status(200).json(dataCourse)
      
        } catch (error) {
            console.error(error);
           return res.status(500).json( { error: 'Server error' } );
        }
    },

    create: async(req,res)=>{
        const {name,
               teachers,
               subjects} = req.body;

        try {
            
            const courseCreate = await Courses.create({
                name
            });

            if(teachers && teachers.length > 0){
                await courseCreate.setTeachers(teachers);
            }
            if(subjects && subjects.length > 0){
                await courseCreate.setSubjects(subjects);
            }

            const dataCourse = {
                meta: {
                    status: 201,
                    URL: '/course/create'
                },
                data: courseCreate
            };

           return res.status(201).json(dataCourse);

        } catch (error) {
            console.error('Error creating: ', error);
               return res.status(500).json({ error: 'Server error' });
            
        }
    },

    update: async(req,res)=>{
        try {

        const {
            name,
            teachers,
            subjects
        } = req.body;

        const includes = {
            include: [  
                        { association: 'subjects' },
                        { association: 'teachers' }
             ]
        };

            const id = req.params.id;

            const update = await Courses.update({
                name
            },{
                where: {id}
            });

            if(update){
                const courseUpdate = await Courses.findByPk(id, includes);

                const dataCourse = {
                    meta: {
                        status: 202,
                        URL: '/api/course/update/:id'
                    },
                    data: courseUpdate
                };

                if(teachers && teachers.length > 0){
                    await courseUpdate.setTeachers(teachers);
                }

                if(subjects && subjects.length > 0){
                    await courseUpdate.setSubjects(subjects);
                }

                return res.status(202).json(dataCourse);
            }

        } catch (error) {
            console.error('Error Updating: ', error);
            return res.status(500).json({error: 'Server error'});
        }
    },

    delete: async(req,res)=>{
        try {
            const id = req.params.id;

            const courseDelete = await Courses.destroy({
                where: {id}
            });

            return res.status(204).json(courseDelete);

        } catch (error) {
            console.error('Error deleting: ', error);
        return res.status(500).json({ error: 'Server error' });
        }
    }

};