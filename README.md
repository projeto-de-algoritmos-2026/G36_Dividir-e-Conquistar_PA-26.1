# LogiSmart

Numero da Lista: 36
Conteudo da Disciplina: Dividir e Conquistar (Projeto de Algoritmos)

## Alunos

| Matricula  | Aluno                            |
| ---------- | -------------------------------- |
| 231026616  | Davi Emanuel Ribeiro de Oliveira |
| 231026330  | Felipe Lopes Pedroza             |

## Sobre

Sistema web para gestao inteligente de entregadores usando o algoritmo **Par de Pontos Mais Proximos** com **divisao e conquista** ($O(n \log n)$) e comparacao com **forca bruta** ($O(n^2)$). O objetivo e detectar aglomerados de entregadores proximos e sugerir o entregador mais proximo para novos pedidos.

**Stack:**
- **Frontend:** React.js
- **Backend:** Node.js com Express
- **API:** REST com JSON

## Screenshots

Nao disponivel no momento.

## Video

[![Apresentacao LogiSmart](https://img.youtube.com/vi/3WMMLkYv18g/0.jpg)](https://www.youtube.com/watch?v=3WMMLkYv18g)

## Instalacao

Linguagens: **JavaScript (Node.js)** e **React**

### Pre-requisitos

* Node.js v16+ instalado
* npm (Node Package Manager)
* Git
* Terminal ou prompt de comando

### Instalacao e Execucao

#### 1. Clonar o repositorio

```bash
git clone https://github.com/projeto-de-algoritmos-2026/G36_Dividir-e-Conquistar_PA-26.1.git
cd G36_Dividir-e-Conquistar_PA-26.1/logismart
```

#### 2. Instalar e rodar Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estara disponivel em `http://localhost:3001`

#### 3. Instalar e rodar Frontend (em outro terminal)

```bash
cd frontend
npm install
npm start
```

O aplicativo estara disponivel em `http://localhost:3000`

## Funcionalidades

### Gestao de Entregadores

* ✅ Listar entregadores
* ✅ Adicionar entregador
* ✅ Remover entregador
* ✅ Dados em memoria (sem persistencia)

### Algoritmo: Par de Pontos Mais Proximos (Divisao e Conquista)

Detecta os dois entregadores mais proximos entre si e compara o custo com forca bruta:

* **Ordenacao:** por coordenada X
* **Divisao:** recursiva ao meio
* **Combinacao:** faixa de largura $2\delta$
* **Complexidade:** $O(n \log n)$

### Modo Pedido

* 📦 Clique no mapa para marcar o cliente
* ✅ Retorna o entregador mais proximo

### Dashboard

* 📊 Comparacao de desempenho (comparacoes DC vs forca bruta)
* 🗺 Mapa em canvas com destaques
* ⚠ Indicacao de aglomerado

## Estrutura do Projeto

```
logismart/
├── backend/
│   ├── src/
│   │   ├── server.js                    # Servidor Express
│   │   ├── routes/
│   │   │   └── api.js                   # Rotas da API
│   │   ├── controllers/
│   │   │   ├── algoritmoController.js   # Algoritmo DC e forca bruta
│   │   │   └── entregadoresController.js# CRUD e pedido
│   │   └── data/
│   │       └── db.js                    # Dados em memoria
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                       # Componente principal
│   │   ├── pages/
│   │   │   └── Dashboard.jsx            # Pagina principal
│   │   ├── components/
│   │   │   ├── Mapa.jsx                 # Canvas interativo
│   │   │   └── PainelAlgoritmo.jsx      # Resultado DC vs forca bruta
│   │   ├── hooks/
│   │   │   └── useLogismart.js          # Hook customizado
│   │   ├── services/
│   │   │   └── api.js                   # Cliente HTTP (Axios)
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Entregadores

**GET** `/api/entregadores` - Lista entregadores e par mais proximo
```json
{
	"entregadores": [],
	"aglomerado": {
		"entregadorA": {},
		"entregadorB": {},
		"distancia": 0
	},
	"algoritmos": {
		"dc": { "comparacoes": 0, "complexidade": "O(n log n)" },
		"fb": { "comparacoes": 0, "complexidade": "O(n^2)" },
		"reducao": 0
	}
}
```

**POST** `/api/entregadores` - Adiciona entregador
```json
{
	"nome": "Maria",
	"x": 120,
	"y": 80
}
```

**DELETE** `/api/entregadores/:id` - Remove entregador

### Pedido

**POST** `/api/pedido` - Retorna entregador mais proximo do ponto
```json
{
	"x": 200,
	"y": 150
}
```

## Conceitos Importantes

**Divisao e Conquista:** divide o conjunto de pontos, resolve recursivamente e combina na faixa central.

**Distancia Euclidiana:** $d(a,b) = \sqrt{(x_a - x_b)^2 + (y_a - y_b)^2}$

## Tecnologias Utilizadas

### Frontend

- **React 18.2.0** - UI Framework
- **Axios** - Cliente HTTP
- **CSS3** - Estilizacao

### Backend

- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **CORS** - Cross-Origin Resource Sharing
- **UUID** - Geracao de IDs unicos

## Observacoes

* Dados armazenados em memoria (nao persistem entre reinicializacoes)
* Algoritmos executados em tempo real a cada operacao
* Interface responsiva e atualizacao em tempo real

## Contribuidores

- **Davi Emanuel Ribeiro de Oliveira** (231026616)
- **Felipe Lopes Pedroza** (231026330)

---

**Universidade de Brasilia (UnB)**  
**Disciplina:** Projeto de Algoritmos (2026/1)