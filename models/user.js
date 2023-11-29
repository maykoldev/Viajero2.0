//conectar a mongo con la dependencia
const mongoose = require('mongoose');
const usersRouter = require('../controllers/users');

//definicion del schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false
    }    
})

// confg respuesta del usuario en el schema
userSchema.set('toJSON',{
    transform:(document,returnObject) =>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id;
        delete returnObject.__v;
        delete returnObject.password;
    }
})

//damos el nombre, registrar el modelo, que datos tiene ese modelo
const User = mongoose.model('User',userSchema);

module.exports = User;