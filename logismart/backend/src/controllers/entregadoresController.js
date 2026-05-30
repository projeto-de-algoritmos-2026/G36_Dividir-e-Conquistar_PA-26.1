const { v4: uuidv4 } = require("uuid");
const { entregadores } = require("../data/db");
const { closestPairDC, forcaBruta, maisProximoDe } = require("./algoritmoController");

// Lista entregadores + resultado do algoritmo par mais próximo
function listar(req, res) {
  if (entregadores.length < 2) {
    return res.json({ entregadores, aglomerado: null, algoritmos: null });
  }

  const dc = closestPairDC(entregadores);
  const fb = forcaBruta(entregadores);

  res.json({
    entregadores,
    aglomerado: {
      entregadorA: dc.a,
      entregadorB: dc.b,
      distancia: dc.dist,
    },
    algoritmos: {
      dc:  { comparacoes: dc.comparacoes, complexidade: "O(n log n)" },
      fb:  { comparacoes: fb.comparacoes, complexidade: "O(n²)" },
      reducao: Math.round((1 - dc.comparacoes / fb.comparacoes) * 100),
    },
  });
}

// Adiciona entregador
function adicionar(req, res) {
  const { nome, x, y } = req.body;
  if (!nome || x == null || y == null)
    return res.status(400).json({ erro: "nome, x e y são obrigatórios." });
  const novo = { id: uuidv4(), nome, x: Number(x), y: Number(y) };
  entregadores.push(novo);
  res.status(201).json({ mensagem: "Entregador adicionado.", entregador: novo });
}

// Remove entregador
function remover(req, res) {
  const idx = entregadores.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erro: "Entregador não encontrado." });
  entregadores.splice(idx, 1);
  res.json({ mensagem: "Entregador removido." });
}

// Dado um ponto (pedido), retorna o entregador mais próximo
function pedido(req, res) {
  const { x, y } = req.body;
  if (x == null || y == null)
    return res.status(400).json({ erro: "x e y do pedido são obrigatórios." });
  if (!entregadores.length)
    return res.status(400).json({ erro: "Nenhum entregador disponível." });

  const resultado = maisProximoDe(entregadores, { x: Number(x), y: Number(y) });
  res.json({
    entregador: resultado.entregador,
    distancia: resultado.dist,
    mensagem: `${resultado.entregador.nome} é o mais próximo do pedido.`,
  });
}

module.exports = { listar, adicionar, remover, pedido };
