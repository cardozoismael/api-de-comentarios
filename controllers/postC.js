const comentarios = require("../comentarios/posts")
const jwt= require("jsonwebtoken")


exports.obtenerAutorizacion=(req,res)=>{
    const {usuario,password}=req.body;

    if(usuario==="ismael" && password === 123){
        const token = jwt.sign({id:123,nombre:"ismael"},"mi_clave_secreta",{expiresIn:"1h"})
        res.json({token});
    }else{
        res.status(401).json({message:"credenciales invalidas"})
    }
}

exports.obtenerTodo=(req,res)=>{
    res.json(comentarios);
}

exports.obtenerId=(req,res)=>{
    const id = parseInt(req.params.id)
    const comentario=comentarios.find(c=>c.id === id)
    
    if (comentario){
        res.json(comentario)
    }else{
        res.status(404).json({error:"no se a encontrado el id"});
        
    }
}

exports.añadirC=(req,res)=>{
    const nuevo= {
        id :comentarios.length +1,
        usuario :req.body.usuario,
        comentario : req.body.comentario
    }
    comentarios.push(nuevo);
    res.json(comentarios)
}


exports.modifiC=(req,res)=>{
    const id = parseInt(req.params.id);
    const comentario= comentarios.find(c=>c.id === id)

    if(comentario){
        comentario.usuario = req.body.usuario || comentario.usuario,
        comentario.comentario = req.body.comentario || comentario.comentario
        res.json(comentario)
    }else{
        res.status(404).json({message:"no se actualizar"})
    }
}

exports.eliminarC=(req,res)=>{
    const id= parseInt(req.params.id);
    const index= comentarios.findIndex(i=>i.id=== id)
    if (index !== -1){
        comentarios.splice(index,1)
        res.json(comentarios)
    }else{
        res.status(404).json({message:"no se encontro el comentario"})
    }
}