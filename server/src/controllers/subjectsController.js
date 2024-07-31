const sequelize = require('sequelize');
const {Op}  = require('sequelize');
const { Subjects } = require('../database/models');

module.exports = {
    allSubjects: async (req, res) => {
        try {

            const includes = {include:
                [{ association: "courses" }, 
                { association: 'students' }, 
                { association: 'tasks' }, 
                { association: 'teachers' }]};

            const subjectsList = await Subjects.findAll(includes);

            const dataSubjects = {
                meta: {
                    status: 200,
                    URL: "/subjects"
                },
                data: subjectsList
            };

           return res.status(200).json(dataSubjects);

        }catch(error){
            console.error(error);
           return res.status(500).json({ error: 'Server error' });
        }
    },

    searchByName: async(req,res)=>{
        try {
            
            const keyword = req.query.keyword || '';

            const subjectsByName = await Subjects.findAll({
                where: {
                    name: {[Op.like]: '%' + keyword + '%'}
                }
            });

            const dataSubjects = {
                meta: {
                    status: 200,
                    URL: '/subjects/search',
                    message: subjectsByName.length > 0? subjectsByName.length + ' Materia(s) encontrada(s)' : 'No se encontro ninguna materia' 
                },
                data: subjectsByName
            };

            return res.status(200).json(dataSubjects);
            
        } catch (error) {
            console.error('Error search: ', error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    searchByPk: async(req,res)=>{
        try {
            const includes = {include:
                [{ association: "courses" }, 
                { association: 'students' }, 
                { association: 'tasks' }, 
                { association: 'teachers' }]};

            const {id} = req.params;

            const subjectsByPk = await Subjects.findByPk(id,includes);

            const dataSubjects = {
                meta: {
                    status: 200,
                    URL: '/subjects/search/:id',
                    message: subjectsByPk != null? ' Materia encontrada' : 'No se encontro ninguna materia' 
                },
                data: subjectsByPk
            };

            return res.status(200).json(dataSubjects);
            
        } catch (error) {
            console.error('Error search: ', error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    create: async(req,res)=>{
        try {
            const {
                name,
                courses,
                students,
                tasks,
                teachers
            } = req.body;

            const includes = {include:
                [{ association: "courses" }, 
                { association: 'students' }, 
                { association: 'tasks' }, 
                { association: 'teachers' }]};

            const subjectsCreate = await Subjects.create({
                name
            }, includes);

            if(courses && courses.length > 0){
                await subjectsCreate.setCourses(courses);
            }

            if(students && students.length > 0){
                await subjectsCreate.setStudents(students);
            }

            if(tasks && tasks.length > 0){
                await subjectsCreate.setTasks(tasks);
            }

            if(teachers && teachers.length > 0){
                await subjectsCreate.setTeachers(teachers);
            }

            const dataSubjects = {
                meta: {
                    status: 201,
                    URL: '/subject/create'
                },
                data: subjectsCreate
            };

            return res.status(201).json(dataSubjects);

        } catch (error) {
            console.error('Error creating: ', error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    update: async(req,res)=>{
        try {
            const{
                name,
                courses,
                students,
                tasks,
                teachers
            } = req.body;

            const {id} = req.params;

            const includes = {include:
                [{ association: "courses" }, 
                { association: 'students' }, 
                { association: 'tasks' }, 
                { association: 'teachers' }]};

            const update = await Subjects.update({
                name
            },{
                where: {id}
            });

            if(update){
                const subjectUpdate = await Subjects.findByPk(id,includes);

                if (courses && courses.length > 0) {
                    await subjectUpdate.setCourses(courses);
                };

                if (students && students.length > 0) {
                    await subjectUpdate.setStudents(students);
                };
                
                if (tasks && tasks.length > 0) {
                    await subjectUpdate.setTasks(tasks);
                };

                if (teachers && teachers.length > 0) {
                    await subjectUpdate.setTeachers(teachers);
                };

            const dataSubjects = {
                meta: {
                    status: 202,
                    URL: '/subject/update/:id'
                },
                data: subjectUpdate
            };

            return res.status(202).json(dataSubjects);

            }

        } catch (error) {
            console.error('Error updating: ', error);
            return res.status(500).json({ error: 'Server error'});
        }
    },

    delete: async(req,res)=>{
        try {
            const {id} = req.params;
            
            const subjectDelete = await Subjects.destroy({
                where: {id}
            });

            return res.status(204).json(subjectDelete);

        } catch (error) {
            console.error('Error deleting: ', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

};