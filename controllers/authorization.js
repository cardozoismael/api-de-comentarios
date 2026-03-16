const jwt = require("jsonwebtoken")

function authenticacion(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(403).json({message:"token requerido"})
    }
    jwt.verify(token,"mi_clave_secreta",(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"token invalido"})
        }
        req.user =decoded;
        next()
    })
}

module.exports=authenticacion