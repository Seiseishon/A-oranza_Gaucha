const sequelize = require("sequelize");
const { Tasks } = require("../database/models");

module.exports = {
    allTasks: async (req, res) => {
        try {
            const data = await Tasks.findAll({
                include: [{ association: "subject" }]
            });

            const dataTasks = data.map((task) => {
                return {
                    id: task.id,
                    task: task.name,
                    subject:
                        task.subject.map((subject) => {
                            return {
                                id: subject.id,
                                subject: subject.name
                            }
                        })
                }
            });

            res.status(200).json(dataTasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}