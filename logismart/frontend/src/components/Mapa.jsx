import React, { useRef, useEffect } from "react";

const W = 700, H = 420;

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export default function Mapa({ entregadores, aglomerado, pedido, maisProximo, modo, onClickMapa }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 70) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += 70) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    const aglIds = aglomerado ? new Set([aglomerado.entregadorA?.id, aglomerado.entregadorB?.id]) : new Set();
    const proxId = maisProximo?.entregador?.id;

    // Linha do par mais próximo
    if (aglomerado?.entregadorA) {
      const { entregadorA: a, entregadorB: b } = aglomerado;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = "#E24B4A"; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      ctx.fillStyle = "#E24B4A"; ctx.font = "500 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`${aglomerado.distancia.toFixed(0)}px`, mx, my - 7);
    }

    // Linha do pedido ao mais próximo
    if (pedido && maisProximo?.entregador) {
      const e = maisProximo.entregador;
      ctx.beginPath(); ctx.moveTo(pedido.x, pedido.y); ctx.lineTo(e.x, e.y);
      ctx.strokeStyle = "#3B6D11"; ctx.lineWidth = 2; ctx.setLineDash([5, 3]); ctx.stroke(); ctx.setLineDash([]);
    }

    // Pontos dos entregadores
    entregadores.forEach(e => {
      const isClose = aglIds.has(e.id);
      const isProx  = e.id === proxId;
      const cor = isClose ? "#A32D2D" : isProx ? "#3B6D11" : "#185FA5";
      const bg  = isClose ? "#FCEBEB" : isProx ? "#EAF3DE" : "#E6F1FB";
      const r   = isClose || isProx ? 10 : 8;

      ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, Math.PI * 2);
      ctx.fillStyle = bg; ctx.fill();
      ctx.strokeStyle = cor; ctx.lineWidth = isClose || isProx ? 2 : 1.5; ctx.stroke();

      const sigla = e.nome.split(" ").slice(0, 2).map(x => x[0]).join("");
      ctx.fillStyle = cor; ctx.font = "500 10px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(sigla, e.x, e.y);

      ctx.font = "11px sans-serif"; ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.textBaseline = "bottom";
      ctx.fillText(e.nome.split(" ")[0], e.x, e.y - 12);
    });

    // Pino do pedido
    if (pedido) {
      ctx.beginPath(); ctx.arc(pedido.x, pedido.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#FAEEDA"; ctx.fill();
      ctx.strokeStyle = "#854F0B"; ctx.lineWidth = 2; ctx.stroke();
      ctx.font = "12px sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("📦", pedido.x, pedido.y);
      ctx.fillStyle = "#854F0B"; ctx.font = "11px sans-serif"; ctx.textBaseline = "bottom";
      ctx.fillText("Pedido", pedido.x, pedido.y - 13);
    }
  }, [entregadores, aglomerado, pedido, maisProximo]);

  const handleClick = (e) => {
    if (modo !== "pedido") return;
    const rect = ref.current.getBoundingClientRect();
    const scaleX = W / rect.width, scaleY = H / rect.height;
    onClickMapa({ x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY });
  };

  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      onClick={handleClick}
      style={{ width: "100%", borderRadius: 8, cursor: modo === "pedido" ? "crosshair" : "default", border: "0.5px solid #e4e2dc", display: "block" }}
    />
  );
}
