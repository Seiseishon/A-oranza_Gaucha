const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes)=>{
    let alias = "Teachers"

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
        tableName: "teachers",
        timestamps: false
    }


    const Teacher = sequelize.define(alias,cols,config)

    return Teacher
}