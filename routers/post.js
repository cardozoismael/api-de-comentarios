const express = require("express");
const router = express.Router();
const Controllers = require("../controllers/postC")
const authenticacion= require("../middleware/authorization")

router.post("/login",Controllers.obtenerAutorizacion)

router.get("/api",authenticacion,Controllers.obtenerTodo);

router.get("/api/:id",authenticacion,Controllers.obtenerId)

router.post("/api",authenticacion,Controllers.añadirC)

router.put("/api/:id",authenticacion,Controllers.modifiC)

router.delete("/api/:id",authenticacion,Controllers.eliminarC)

module.exports = router;
