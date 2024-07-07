module.exports = (sequelize, dataTypes)=>{
    let alias = "Courses"

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
        tableName: "courses",
        timestamps: false
    }


    const Course = sequelize.define(alias,cols,config)
        Course.associate = function(models){
            Course.hasMany(models.Students,{
            as: "Students",
            foreingKey: "id_course"})

            Course.belongsToMany(models.Subjects,{
                as: "subjects",
                through: "courses_subjects",
                foreignKey: "id_course",
                otherKey: "id_subject",
                timestamps: false
            })
            Course.belongsToMany(models.Teachers,{
                as: "Teachers",
                through: "teachers_courses",
                foreignKey: "id_course",
                otherKey: "id_teacher",
                timestamps: false
            })

        }

        return Course
}
