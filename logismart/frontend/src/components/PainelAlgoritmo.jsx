import React from "react";

export default function PainelAlgoritmo({ algoritmos, aglomerado, maisProximo }) {
  if (!algoritmos) return <p style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>Aguardando dados...</p>;

  const { dc, fb, reducao } = algoritmos;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {[
          ["Algoritmo", "Divisão e conquista"],
          ["Complexidade", "O(n log n)"],
          ["Comparações DC", dc.comparacoes, "ok"],
          ["Comparações força bruta", fb.comparacoes, "err"],
          ["Redução", `${reducao}% menos`, "info"],
        ].map(([label, val, cor]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
            <span style={{ color: "var(--color-text-secondary)" }}>{label}</span>
            <span style={{ fontWeight: 500, color: cor === "ok" ? "var(--color-text-success)" : cor === "err" ? "var(--color-text-danger)" : cor === "info" ? "var(--color-text-info)" : "var(--color-text-primary)" }}>{val}</span>
          </div>
        ))}
      </div>

      {aglomerado && (
        <div style={{ marginTop: 10, background: "var(--color-background-danger)", borderRadius: 8, padding: "9px 11px" }}>
          <div style={{ fontSize: 11, color: "var(--color-text-danger)", fontWeight: 500, marginBottom: 4 }}>⚠ Aglomerado detectado</div>
          <div style={{ fontSize: 12, color: "var(--color-text-danger)" }}>
            {aglomerado.entregadorA?.nome} e {aglomerado.entregadorB?.nome} estão a {aglomerado.distancia.toFixed(0)}px. Considere redistribuir um deles.
          </div>
        </div>
      )}

      {maisProximo?.entregador && (
        <div style={{ marginTop: 8, background: "var(--color-background-success)", borderRadius: 8, padding: "9px 11px" }}>
          <div style={{ fontSize: 11, color: "var(--color-text-success)", fontWeight: 500, marginBottom: 4 }}>✓ Entregador sugerido</div>
          <div style={{ fontSize: 12, color: "var(--color-text-success)" }}>
            {maisProximo.entregador.nome} — distância {maisProximo.distancia.toFixed(0)}px
          </div>
        </div>
      )}
    </div>
  );
}
