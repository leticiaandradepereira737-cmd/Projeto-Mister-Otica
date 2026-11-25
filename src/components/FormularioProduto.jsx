import { useEffect, useState } from "react"
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";

function FormularioProduto({
  adicionarProduto,
  editarProduto,
  produtoEmEdicao,
  cancelarEdicao
}) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("Óculos de Sol");
  const [marca, setMarca] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState("Disponível");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (produtoEmEdicao) {
      setNome(produtoEmEdicao.nome);
      setCategoria(produtoEmEdicao.categoria);
      setMarca(produtoEmEdicao.marca);
      setPreco(produtoEmEdicao.preco);
      setStatus(produtoEmEdicao.status);
      setDescricao(produtoEmEdicao.descricao);
      setImagem(produtoEmEdicao.imagem);
      setErro("");
    } else {
      limparCampos();
    }
  }, [produtoEmEdicao]);

  function limparCampos() {
    setNome("");
    setCategoria("Óculos de Sol");
    setMarca("");
    setPreco("");
    setStatus("Disponível");
    setDescricao("");
    setImagem("");
    setErro("");
  }

  function handleSubmit(e) {
    if (!nome.trim() || !marca.trim() || !preco.trim()) {
      setErro("Por favor, preencha nome, marca e preço do produto.");
      return;
    }
    const dadosProduto = {
      nome,
      categoria,
      marca,
      preco,
      status,
      descricao: descricao.trim() || "Produto óptico de alta qualidade.",
      imagem: imagem.trim() || "https://via.placeholder.com/200?text=Mister+Otica"
    };

    if (produtoEmEdicao) {
      editarProduto({ ...dadosProduto, id: produtoEmEdicao.id });
      cancelarEdicao();
    } else {
      adicionarProduto(dadosProduto);
    }

    limparCampos();
  }

  return (
    <section>
      <h2>{produtoEmEdicao ? "Editar Produto" : "Cadastrar Novo Produto"}</h2>

      {erro && <p>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Produto: </label>
          <input
            type="text"
            placeholder="Ex: Armação Wayfarer"
            value={nome}
            onchange={(e) =>
              setNome(e.target.value)}
          />
        </div>

        <div>
          <label>Categoria: </label>
          <select
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)}
          >
            <option value="Óculos de Sol">Óculos de Sol</option>
            <option value="Óculos de Grau">Óculos de Grau</option>
            <option value="Lente com Grau">Lente com Grau</option>
            <option value="Lente sem Grau">Lente sem Grau</option>
            <option value="Lente de Conbtato">Lente de Contato</option>
          </select>
        </div>

        <div>
          <label>Marca: </label>
          <input
            type="text"
            placeholder="Ex: Ray-Ban, Zeiss, Acuvue..."
            value={marca}
            onChange={(e) =>
              setMarca(e.target.value)}
          />
        </div>

        <div>
          <label>Preço (R$): </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 299.99"
            value={preco}
            onChange={(e) =>
              setPreco(e.target.value)}
          />
        </div>

        <div>
          <label>Staus: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Disponível">Disponível</option>
            <option value="Esgotado">Esgotado</option>
          </select>
        </div>

        <div>
          <label>URL da Imagem: </label>
          <input
            type="text"
            placeholder="Cole o link da imgem (opcional)"
            value={imagem}
            onChange={(e) =>
              setImagem(e.target.value)}
          />
        </div>

        <div>
          <label>Descrição / Especificações: </label>
          <textarea
            placeholder="Detalhes do produto, material, proteção UV..."
            value={descricao}
            onChange={(e) =>
              setDescricao(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">
            {produtoEmEdicao ? (
              <>
                <FaSave /> Salvar Alterações
              </>
            ) : (
              <>
                <FaPlus /> Cadastrar Produto
              </>
            )}
          </button>

          {produtoEmEdicao && (
            <button type="button" onClick={cancelarEdicao}>
              <FaTimes /> Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default FormularioProduto;