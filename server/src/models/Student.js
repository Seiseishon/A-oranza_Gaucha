const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    let alias = "Students"

    let cols = {
        id: {
            type: DataTypes.INTERGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNulll: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNulll: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNulll: false
        },
        birthday: {
            type: DataTypes.DATE,
            allowNulll: false
        },
        age: {
            type: DataTypes.INTERGER,
            allowNulll: false
        },
        dni: {
            type: DataTypes.INTERGER,
            allowNulll: false
        },
    }

    let config = {
        tableName: "students",
        timestamps: false
    }


    const Student = sequelize.define(alias,cols,config)

    Student.associate = function(models){
        Student.belongsTo(models.Courses,{
            as: "courses",
            foreingKey: "id_course"
        })
    }

    return Student
}