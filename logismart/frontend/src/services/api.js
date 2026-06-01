import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const getEntregadores = () => api.get("/entregadores");
export const adicionarEntregador = (payload) => api.post("/entregadores", payload);
export const removerEntregador = (id) => api.delete(`/entregadores/${id}`);
export const enviarPedido = (payload) => api.post("/pedido", payload);
