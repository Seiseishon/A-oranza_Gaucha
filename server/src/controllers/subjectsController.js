const sequelize = require('sequelize');
const { Subjects } = require('../database/models');

module.exports = {
    allSubjects: async (req, res) => {
        try {
            const data = await Subjects.findAll({
                include: [{association: "courses"}]
            });

            const dataSubjects = {
                meta: {
                    status: 200,
                    URL: "/subjects"
                },
                data: data
            }

            res.status(200).json(dataSubjects)

        }catch(error){
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}