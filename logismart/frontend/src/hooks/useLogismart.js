import { useState, useEffect, useCallback } from "react";
import {
  getEntregadores,
  adicionarEntregador,
  removerEntregador,
  enviarPedido,
} from "../services/api";

export function useLogismart() {
  const [entregadores, setEntregadores] = useState([]);
  const [aglomerado, setAglomerado]     = useState(null);
  const [algoritmos, setAlgoritmos]     = useState(null);
  const [loading, setLoading]           = useState(false);
  const [erro, setErro]                 = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const { data } = await getEntregadores();
      setEntregadores(data.entregadores);
      setAglomerado(data.aglomerado);
      setAlgoritmos(data.algoritmos);
    } catch {
      setErro("Erro ao carregar. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const adicionar = async (payload) => {
    await adicionarEntregador(payload);
    await carregar();
  };

  const remover = async (id) => {
    await removerEntregador(id);
    await carregar();
  };

  const buscarProximo = async (x, y) => {
    const { data } = await enviarPedido({ x, y });
    return data;
  };

  return { entregadores, aglomerado, algoritmos, loading, erro, adicionar, remover, buscarProximo, recarregar: carregar };
}
