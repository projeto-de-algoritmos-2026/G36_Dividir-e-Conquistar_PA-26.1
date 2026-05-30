const { v4: uuidv4 } = require("uuid");

let entregadores = [
  { id: uuidv4(), nome: "Lucas Ferreira",  x: 120, y: 80  },
  { id: uuidv4(), nome: "Ana Paula",       x: 310, y: 150 },
  { id: uuidv4(), nome: "Bruno Mendes",    x: 480, y: 90  },
  { id: uuidv4(), nome: "Carla Dias",      x: 200, y: 260 },
  { id: uuidv4(), nome: "Diego Lima",      x: 380, y: 300 },
  { id: uuidv4(), nome: "Elisa Rocha",     x: 560, y: 220 },
  { id: uuidv4(), nome: "Felipe Souza",    x: 90,  y: 370 },
  { id: uuidv4(), nome: "Gabi Torres",     x: 310, y: 390 },
  { id: uuidv4(), nome: "Hugo Neto",       x: 490, y: 370 },
  { id: uuidv4(), nome: "Isabela Cruz",    x: 650, y: 310 },
  { id: uuidv4(), nome: "João Vitor",      x: 200, y: 180 }, // próximo de Ana Paula
  { id: uuidv4(), nome: "Karen Leal",      x: 330, y: 160 }, // próximo de Ana Paula
];

module.exports = { entregadores };
