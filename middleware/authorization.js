const jwt = require("jsonwebtoken")

function authenticacion(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token)return res.status(401).json({message:"token requerido"})
    try{
    const verificacion = jwt.verify(token,"mi_clave_secreta")
    next()
    }
    catch(e){
        console.error(e)
        res.status(401).json({message:"error al acceder con el token"})
    }
}

module.exports=authenticacion