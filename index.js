const express = require ("express");
const app = express();
const routers = require ("./routers/post");
const PORT =process.env.PORT || 3000;

app.use(express.json());

app.use("/", routers);


app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
})