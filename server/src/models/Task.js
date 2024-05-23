const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    let alias = "Task"

    let cols = {
        id: {
            type: DataTypes.INTERGER,
            primaryKey: true,
            autoIncrement: true
        },
        files: {
            type: DataTypes.STRING(1000),
            allowNulll: false
        },
        
    }

    let config = {
        tableName: "tasks",
        timestamps: false
    }


    const Task = sequelize.define(alias,cols,config)

    Task.associate = function(models){
        Task.hasOne(models.Courses,{
            as: "Courses",
            foreingKey: "courses_id"
        })
    }

    return Task
}