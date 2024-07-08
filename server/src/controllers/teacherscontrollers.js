const sequelize = require('sequelize');
const { Teachers } = require('../database/models');

const teacherscontrollers = {
    teachersAll: async(req,res)=>{
        try {
            const data = await Teachers.findAll()
            console.log(data);
        }
        catch (error){
            console.log(error);
        }
        
    }
}


module.exports = {
    teacherscontrollers
}