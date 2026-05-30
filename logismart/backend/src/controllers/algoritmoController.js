// Distância euclidiana entre dois pontos
function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Força bruta O(n²) — usada para comparação de desempenho
function forcaBruta(pts) {
  let comparacoes = 0;
  let melhor = { dist: Infinity, a: null, b: null };
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      comparacoes++;
      const d = dist(pts[i], pts[j]);
      if (d < melhor.dist) melhor = { dist: d, a: pts[i], b: pts[j] };
    }
  }
  return { ...melhor, comparacoes };
}

// Divisão e conquista O(n log n)
function closestPairDC(pts) {
  let comparacoes = 0;

  function _solve(sorted) {
    const n = sorted.length;

    // Base: força bruta para poucos pontos
    if (n <= 3) {
      let melhor = { dist: Infinity, a: null, b: null };
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          comparacoes++;
          const d = dist(sorted[i], sorted[j]);
          if (d < melhor.dist) melhor = { dist: d, a: sorted[i], b: sorted[j] };
        }
      }
      return melhor;
    }

    // Divide ao meio pelo eixo X
    const mid = Math.floor(n / 2);
    const midX = sorted[mid].x;
    const esquerda = _solve(sorted.slice(0, mid));
    const direita  = _solve(sorted.slice(mid));

    // Melhor das duas metades
    let melhor = esquerda.dist < direita.dist ? esquerda : direita;
    const delta = melhor.dist;

    // Faixa central de largura 2*delta
    const faixa = sorted
      .filter(p => Math.abs(p.x - midX) < delta)
      .sort((a, b) => a.y - b.y);

    // Verifica pares na faixa (máximo 8 comparações por ponto)
    for (let i = 0; i < faixa.length; i++) {
      for (let j = i + 1; j < faixa.length && (faixa[j].y - faixa[i].y) < delta; j++) {
        comparacoes++;
        const d = dist(faixa[i], faixa[j]);
        if (d < melhor.dist) melhor = { dist: d, a: faixa[i], b: faixa[j] };
      }
    }
    return melhor;
  }

  const sorted = [...pts].sort((a, b) => a.x - b.x);
  const resultado = _solve(sorted);
  return { ...resultado, comparacoes };
}

// Encontra o entregador mais próximo de um ponto (pedido do cliente)
function maisProximoDe(entregadores, ponto) {
  let melhor = { dist: Infinity, entregador: null };
  for (const e of entregadores) {
    const d = dist(e, ponto);
    if (d < melhor.dist) melhor = { dist: d, entregador: e };
  }
  return melhor;
}

module.exports = { closestPairDC, forcaBruta, maisProximoDe, dist };
