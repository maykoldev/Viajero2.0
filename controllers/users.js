//el router registra POST, GET, DELETE, etc
const usersRouter = require('express').Router();


//registro los datos del usuario
usersRouter.post('/',(request, response)=>{
    const{name,email,password} = request.body;
    console.log(name, email, password)
})
module.exports = usersRouter;