module.exports = (sequelize, dataTypes)=>{
    let alias = "Subjects"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    }

    let config = {
        tableName: "subjects",
        timestamps: false
    }


    const Subject = sequelize.define(alias,cols,config)

    Subject.associate = function(models){
        Subject.belongsToMany(models.Courses,{
                as: "courses",
                through: "courses_subjects",
                foreignKey: "id_subject",
                otherKey: "id_course",
                timestamps: false
            })
            Subject.belongsToMany(models.Students,{
                as: "students",
                through: "students_subjects",
                foreignKey: "id_subject",
                otherKey: "id_student",
                timestamps: false
            })
            Subject.belongsToMany(models.Tasks,{
                as: "tasks",
                through: "subjects_tasks",
                foreignKey: "id_subject",
                otherKey: "id_task",
                timestamps: false
            })
            Subject.belongsToMany(models.Teachers,{
                as: "teachers",
                through: "teachers_subjects",
                foreignKey: "id_subject",
                otherKey: "id_teacher",
                timestamps: false
            })

            
    }

        return Subject
}