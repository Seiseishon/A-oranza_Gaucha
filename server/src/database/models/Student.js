module.exports = (sequelize, dataTypes)=>{
    let alias = "Students"

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
        tableName: "students",
        timestamps: false
    }


    const Student = sequelize.define(alias,cols,config)

    Student.associate = (models) => {
        Student.belongsTo(models.Courses, {
            as: "courses",
            foreignKey: "id_course"
        })
    }
       /*  Student.belongsToMany(models.Subjects,{
            as: "subjects",
            through: "students_subjects",
            foreingKey: "id_student",
            otherKey: "id_subject",
            timestamps: false
        })
        Student.belongsToMany(models.Tasks,{
            as: "tasks",
            through: "students_tasks",
            foreingKey: "id_student",
            otherKey: "id_task",
            timestamps: false
        })
    } */

    return Student
}