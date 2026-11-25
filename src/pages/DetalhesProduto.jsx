import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag, FaCheckCircle } from "react-icons/fa";

function DetalhesProduto({ produtos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const produto = produtos.find((item) => item.id === Number(id));

  if (!produto) {
    return (
      <div>
        <h2>Produto não encontrado!</h2>
        <button onClick={() => navigate("/produtos")}>
          <FaArrowLeft /> Voltar para o Catálogo
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/produtos")}>
        <FaArrowLeft /> Voltar para o Catálogo
      </button>

      <h1>{produto.nome}</h1>
      <img src={produto.imagem} alt={produto.nome} />

      <p>
        <FaTag /> <strong>Categoria:</strong> {produto.categoria}
      </p>
      <p>
        <strong>Marca:</strong> {produto.marca}
      </p>
      <p>
        <strong>Preço:</strong> R$ {produto.preco}
      </p>
      <p>
        <FaCheckCircle /> <strong>Disponibilidade:</strong> {produto.status}
      </p>
      <p>
        <strong>Descrição:</strong> {produto.descricao}
      </p>
    </div>
  );
}

export default DetalhesProduto;