const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/entregadoresController");

router.get("/entregadores", ctrl.listar);
router.post("/entregadores", ctrl.adicionar);
router.delete("/entregadores/:id", ctrl.remover);
router.post("/pedido", ctrl.pedido);

module.exports = router;
