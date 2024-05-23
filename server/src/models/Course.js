const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    let alias = "courses"

    let cols = {
        id: {
            type: DataTypes.INTERGER,
            primaryKey: true,
            autoIncrement: true
        },
        coursed: {
            type: DataTypes.STRING(100),
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
            foreingKey: "id_course"
        })
    }

    Course.associate = function(models){
        Course.hasOne(models.Tasks,{
            as: "Tasks",
            foreingKey: "courses_id"
        })
    }

    return Course
}