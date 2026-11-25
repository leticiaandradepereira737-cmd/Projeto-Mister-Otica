import { useState } from "react"
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormularioProduto from "../components/FormularioProduto";

function Produtos({
    produtos,
    adicionarProduto,
    editarProduto,
    excluirProduto
}) {
    const [busca, setBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("Todas");
    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

    const produtosFiltrados = produtos.filter((produto) => {
        const bateNomeOuMarca = 
        produto.nome.toLowerCase().includes(busca.toLocaleLowerCase()) ||
        produto.marca.toLowerCase().includes(busca.toLocaleLowerCase());

        const bateCategoria = 
        filtroCategoria === "Todas" || produto.categoria === filtroCategoria;

        return bateNomeOuMarca && bateCategoria;
    });

    function alternarStatus(produto) {
        const novoStatus = produto.status === "Disponível" ? "Esgotado" : "Disponível";
        editarProduto({ ...produto, status: novoStatus });
    }

  return (
    <div>
        <h1>Catálogo Mister Ótica</h1>

        <FormularioProduto
            adicionarProduto={adicionarProduto}
            editarProduto={editarProduto}
            produtoEmEdicao={produtoEmEdicao}
            cancelarEdicao={() => setProdutoEmEdicao(null)}
         />

         <section>
            <h2>Filtrar Produtos</h2>
            <div>
                <label>
                    <FaSearch /> Buscar por nome ou marca:{" "}
                </label>
                <input 
                    type="text"
                    placeholder="Digite o nome ou marca..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>
            <div>
                <label>Categoria: </label>
                <selact 
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                    <option value="Todas">Todas as Categorias</option>
                    <option value="Óculos de Sol">Óculos de Sol</option>
                    <option value="Óculos de Grau">Óculos de Grau</option>
                    <option value="Lente com Grau">Lente com Grau</option>
                    <option value="Lente sem Grau">Lente sem Grau</option>
                    <option value="Lente de Contato">Lente de Contato</option>
                </selact>
            </div>
         </section>

         <hr />

         <section>
            <h2>Produtos Cadastrados ({produtosFiltrados.length})</h2>

            {produtosFiltrados.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <div>
                    {produtosFiltrados.map((produto) => (
                        <article key={produto.id}>
                            <img src={produto.imagem} alt={produto.nome} />
                            <h3>{produto.nome}</h3>
                            <p>
                                <strong>Categoria:</strong> {produto.categoria}
                            </p>
                            <p>
                                <strong>Marca:</strong> {produto.marca}
                            </p>
                            <p>
                                <strong>Preço:</strong> {produto.preco}
                            </p>
                            <p>
                                <strong>Status:</strong> {produto.status}
                            </p>

                            <div>
                                <Link to={`/produtos/${produto.id}`}>
                                <button type="button">
                                    <FaEye /> Detalhes
                                </button>
                                </Link>

                                <button 
                                    type="button" 
                                    onClick={() => setProdutoEmEdicao(produto)}
                                >
                                    <FaEdit /> Editar
                                </button>

                                <button 
                                    type="button" 
                                    onClick={() => alternarStatus(produto)}
                                >
                                   Alterar Status
                                </button>

                                <button 
                                    type="button" 
                                    onClick={() => excluirProduto(produto)}
                                >
                                    <FaTrash /> Excluir
                                </button>
                            </div>
                            <hr />
                        </article>
                    ))}
                </div>
            )}
         </section>
    </div>
  );
}

export default Produtos;