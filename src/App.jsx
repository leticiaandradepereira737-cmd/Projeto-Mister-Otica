import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import DetalhesProduto from "./pages/DetalhesProduto";
import "./App.css";

const produtosIniciais = [
  {
    id: 1,
    nome: "Armação Clássica Aviador",
    categoria: "Óculos de Sol",
    marca: "Ray-Ban",
    preco: "450.00",
    status: "Disponível",
    descricao: "Armação metálica dourada com lentes polarizadas e proteção UV400.",
    imagem: "https://via.placeholder.com/200?text=Oculos+de+Sol"
  },
  {
    id: 2,
    nome: "Armação Acetato Redonda",
    categoria: "Óculos de Grau",
    marca: "Oakley",
    preco: "320.00",
    status: "Disponível",
    descricao: "Armação leve em acetato tartaruga ideal para lentes multifocais ou visão simples.",
    imagem: "https://via.placeholder.com/200?text=Oculos+de+Grau"
  },
  {
    id: 3,
    nome: "Lente Antirreflexo Blue Control",
    categoria: "Lente com Grau",
    marca: "Zeiss",
    preco: "280.00",
    status: "Disponível",
    descricao: "Lente de resina com filtro de luz azul para uso prolongado em telas.",
    imagem: "https://via.placeholder.com/200?text=Lente+com+Grau"
  },
  {
    id: 4,
    nome: "Lente Estética Filtro UV (Sem Grau)",
    categoria: "Lente sem Grau",
    marca: "Essilor",
    preco: "150.00",
    status: "Esgotado",
    descricao: "Lente plana sem grau com tratamento antirrisco e proteção solar.",
    imagem: "https://via.placeholder.com/200?text=Lente+sem+Grau"
  },
  {
    id: 5,
    nome: "Lente de Contato Gelatina Mensal",
    categoria: "Lente de Contato",
    marca: "Acuvue",
    preco: "190.00",
    status: "Disponível",
    descricao: "Caixa com 6 unidades de descarte mensal, alta hidratação e conforto.",
    imagem: "https://via.placeholder.com/200?text=Lente+de+Contato"
  }
];

function App() {
  const [produtos, setProdutos] = useState(() => {
    const dadosSalvos = localStorage.getItem("mister_otica_produtos");
    return dadosSalvos ? JSON.parse(dadosSalvos) : produtosIniciais;
  });
  
  useEffect(() => {
    localStorage.setItem("mister_otica_produtos", JSON.stringify(produtos));
  }, [produtos]);

  function adicionarProduto(novoProduto) {
    const produtoComId = {
      ...novoProduto,
      id: Date.now()
    };
    setProdutos([...produtos, produtoComId]);
  }

  function editarProduto(produtoAtualizado) {
    const listaAtualizada = produtos.map((item) => 
      item.id === produtoAtualizado.id ? { ...produtoAtualizado } : item
    );
    setProdutos(listaAtualizada);
  }

  function excluirProduto(id) {
    const listaFiltrada = produtos.filter((item) => item.id !== id);
    setProdutos(listaFiltrada);
  }
    
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home produtos={produtos} />} />
          <Route
            path="/produtos"
            element={
              <Produtos
                produtos={produtos}
                adicionarProduto={adicionarProduto}
                editarProduto={editarProduto}
                excluirProduto={excluirProduto}
              />
            }
           />
           <Route
            path="/produtod/:id"
            element={<DetalhesProduto produtos={produtos} />}
            />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;