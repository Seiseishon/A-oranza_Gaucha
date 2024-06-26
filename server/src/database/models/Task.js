module.exports = (sequelize, dataTypes)=>{
    let alias = "Tasks"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    }

    let config = {
        tableName: "tasks",
        timestamps: false
    }


    const Task = sequelize.define(alias,cols,config)

    Task.associate = function(models){
        Task.belongsToMany(models.Students,{
                as: "students",
                through: "students_tasks",
                foreingKey: "id_task",
                otherKey: "id_student",
                timestamps: false
        })
        Task.belongsToMany(models.Subjects,{
            as: "subjects",
            through: "subjects_tasks",
            foreingKey: "id_task",
            otherKey: "id_subject",
            timestamps: false
        })
    }

        return Task
}