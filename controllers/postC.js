const comentarios = require("../comentarios/posts")
const jwt= require("jsonwebtoken")


exports.obtenerAutorizacion=(req,res)=>{
    const {usuario,password}=req.body;
try{
    if(usuario==="ismael" && password === 123){
        const token = jwt.sign({id:123,nombre:"ismael"},"mi_clave_secreta",{expiresIn:"1h"})
        res.status(200).json({token});
    }else{
        return res.status(401).json({message:"credenciales invalidas"})
    }
}catch(e){
    console.error(e)
    res.status(500).json({message:"error al acceder"})
}
  
}

exports.obtenerTodo=(req,res)=>{
    try{
        res.status(200).json(comentarios);
    }catch(e){
        console.error(e)
        res.status(500).json({message:"error al obtener los usuarios"})
    }
}

exports.obtenerId=(req,res)=>{
    const id = parseInt(req.params.id) 
    try{
        const comentario=comentarios.find(c=>c.id === id)
        if (comentario){
        res.status(200).json(comentario)
    }else{
        res.status(404).json({error:"no se a encontrado el id"});   
    }
    }catch(e){
        console.error(e)
        res.status(200).json({message:"error al obtener el usuario"})
    }
}

exports.añadirC=(req,res)=>{
    const {usuario,comentario} = req.body
    if(!usuario||!comentario)return res.status(400).json({message:"error al insertar los datos usuario o comentario"})
    try{
    const nuevo= {
        id :comentarios.length +1,
        usuario :usuario,
        comentario : comentario
    }
    comentarios.push(nuevo);
    res.json(comentarios)
    }catch(e){
        console.error(e)
        res.status(500).json({message:"error al añadir el usuario"})
    }
    
}


exports.modifiC=(req,res)=>{
    const id = parseInt(req.params.id);
    try{
    const comentario= comentarios.find(c=>c.id === id)
    if(comentario){
        comentario.usuario = req.body.usuario || comentario.usuario,
        comentario.comentario = req.body.comentario || comentario.comentario
        res.json(comentario)
    }else{
        res.status(404).json({message:"no se actualizar"})
    }
    }catch(e){
        console.error(e)
        res.status(500).json({message:"error al modificar el usuario"})
    }
}

exports.eliminarC=(req,res)=>{
    const id= parseInt(req.params.id);
    try{
    const index= comentarios.findIndex(i=>i.id=== id)
    if (index !== -1){
        comentarios.splice(index,1)
        res.json(comentarios)
    }else{
        res.status(404).json({message:"no se encontro el comentario"})
    }
    }catch(e){
        res.status(500).json({message:"error al eliminar el usuario"})
    }
    
}