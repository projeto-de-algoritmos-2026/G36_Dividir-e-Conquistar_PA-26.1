import React, { useState } from "react";
import { useLogismart } from "../hooks/useLogismart";
import Mapa from "../components/Mapa";
import PainelAlgoritmo from "../components/PainelAlgoritmo";

export default function Dashboard() {
  const { entregadores, aglomerado, algoritmos, loading, erro, adicionar, remover, buscarProximo, recarregar } = useLogismart();
  const [modo, setModo]               = useState("aglomerado");
  const [pedido, setPedido]           = useState(null);
  const [maisProximo, setMaisProximo] = useState(null);
  const [novoNome, setNovoNome]       = useState("");
  const [msg, setMsg]                 = useState(null);

  const handleMapa = async (pt) => {
    if (modo !== "pedido") return;
    setPedido(pt);
    try {
      const res = await buscarProximo(pt.x, pt.y);
      setMaisProximo(res);
    } catch { setMsg({ tipo: "err", texto: "Erro ao buscar entregador próximo." }); }
  };

  const handleAdicionar = async (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;
    const x = Math.random() * 640 + 30, y = Math.random() * 360 + 30;
    await adicionar({ nome: novoNome.trim(), x, y });
    setNovoNome("");
    setMsg({ tipo: "ok", texto: `${novoNome} adicionado ao mapa!` });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleSetModo = (m) => {
    setModo(m);
    if (m === "aglomerado") { setPedido(null); setMaisProximo(null); }
  };

  const closePairIds = aglomerado ? new Set([aglomerado.entregadorA?.id, aglomerado.entregadorB?.id]) : new Set();

  return (
    <div className="dashboard">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">🚚</div>
          <div>
            <h1>LogiSmart</h1>
            <p>Gestão inteligente de entregadores · Par de pontos mais próximos</p>
          </div>
        </div>
        <button className="btn" onClick={recarregar}>↺ Atualizar</button>
      </header>

      {erro && <div className="alert a-err">{erro}</div>}
      {msg  && <div className={`alert a-${msg.tipo}`}>{msg.texto}</div>}

      <div className="stats-row">
        <div className="stat-card"><div className="stat-label">Entregadores</div><div className="stat-val info">{entregadores.length}</div></div>
        <div className="stat-card"><div className="stat-label">Par mais próximo</div><div className="stat-val err">{aglomerado ? aglomerado.distancia.toFixed(0) + "px" : "—"}</div></div>
        <div className="stat-card"><div className="stat-label">Comparações DC</div><div className="stat-val ok">{algoritmos?.dc.comparacoes ?? "—"}</div></div>
        <div className="stat-card"><div className="stat-label">Redução vs O(n²)</div><div className="stat-val warn">{algoritmos ? algoritmos.reducao + "%" : "—"}</div></div>
      </div>

      <div className="main-grid">
        <div className="card">
          <div className="card-title">🗺 Mapa da cidade — {modo === "pedido" ? "clique para marcar o pedido" : "detectando aglomerados"}</div>
          {loading ? <p className="muted">Carregando...</p> : (
            <Mapa entregadores={entregadores} aglomerado={aglomerado} pedido={pedido} maisProximo={maisProximo} modo={modo} onClickMapa={handleMapa} />
          )}
          <div className="legenda">
            <span><span className="dot" style={{background:"#185FA5"}} /> Disponível</span>
            <span><span className="dot" style={{background:"#A32D2D"}} /> Aglomerado</span>
            <span><span className="dot" style={{background:"#3B6D11"}} /> Mais próximo do pedido</span>
          </div>
        </div>

        <div className="side">
          <div className="card">
            <div className="card-title">⚙ Modo de análise</div>
            <div className="modo-btns">
              <button className={`modo-btn${modo === "aglomerado" ? " active" : ""}`} onClick={() => handleSetModo("aglomerado")}>
                🔴 Detectar aglomerados
              </button>
              <button className={`modo-btn${modo === "pedido" ? " active" : ""}`} onClick={() => handleSetModo("pedido")}>
                📦 Novo pedido
              </button>
            </div>
            <div className="info-hint">
              {modo === "aglomerado"
                ? "Identifica dois entregadores muito próximos que podem estar cobrindo a mesma área."
                : "Clique no mapa onde está o cliente. O sistema indica o entregador mais próximo."}
            </div>
          </div>

          <div className="card">
            <div className="card-title">🧮 Algoritmo</div>
            <PainelAlgoritmo algoritmos={algoritmos} aglomerado={aglomerado} maisProximo={maisProximo} />
          </div>

          <div className="card">
            <div className="card-title">➕ Adicionar entregador</div>
            <form onSubmit={handleAdicionar} style={{ display: "flex", gap: 8 }}>
              <input type="text" value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Nome do entregador" style={{ flex: 1 }} />
              <button type="submit" className="btn btn-pri">Adicionar</button>
            </form>
          </div>

          <div className="card">
            <div className="card-title">👥 Entregadores <span className="cnt">{entregadores.length}</span></div>
            <div style={{ maxHeight: 220, overflowY: "auto" }}>
              {entregadores.map(e => {
                const isClose = closePairIds.has(e.id);
                const isProx  = e.id === maisProximo?.entregador?.id;
                return (
                  <div key={e.id} className="ei">
                    <div className="ei-dot" style={{ background: isClose ? "#A32D2D" : isProx ? "#3B6D11" : "#185FA5" }} />
                    <div className="ei-info">
                      <div className="ei-nome">{e.nome}</div>
                      <div className="ei-coord">{Math.round(e.x)}, {Math.round(e.y)}</div>
                    </div>
                    {isClose && <span className="badge b-err">aglomerado</span>}
                    {isProx  && <span className="badge b-ok">mais próximo</span>}
                    <button className="btn-rm" onClick={() => remover(e.id)}>✕</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
