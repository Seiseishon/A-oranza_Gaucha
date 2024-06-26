const Task = require("./Task")

module.exports = (sequelize, dataTypes)=>{
    let alias = "Teachers"

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user:{
            type: dataTypes.STRING(150),
            allowNulll: false
        },
        password:{
            type: dataTypes.STRING(150),
            allowNulll: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNulll: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNulll: false
        },
        email: {
            type: dataTypes.STRING(255),
            allowNulll: false
        },
        dni: {
            type: dataTypes.INTEGER,
            allowNulll: false
        },
        birthdate: {
            type: dataTypes.DATE,
            allowNulll: false
        }
    }

    let config = {
        tableName: "teachers",
        timestamps: false
    }


    const Teacher = sequelize.define(alias,cols,config)


    Teacher.associate = function(models){
        Teacher.belongsToMany(models.Courses,{
            as: "courses",
            through: "teachers_courses",
            foreingKey: "id_teacher",
            otherKey: "id_course",
            timestamps: false
        })
        Teacher.belongsToMany(models.Subjects,{
            as: "subjects",
            through: "teachers_subjects",
            foreingKey: "id_teacher",
            otherKey: "id_subject",
            timestamps: false
        })
    }

    return Teacher
}