import { FaCheckCircle, FaEye, FaGlasses } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home({ produtos }) {
    const totalProdutos = produtos.length;
    const disponiveis = produtos.filter((p) => p.status === "Disponível").length;
    const oculos = produtos.filter(
        (p) => p.categoria === "Óculos de Sol" || p.categoria === "Óculos de Grau"
    ).length
    const lentes = produtos.filter((p) =>
    p.categoria.includes("Lente")
  ).length;

  return (
    <div>
        <h1>Bem-vindo à Mister Ótica</h1>
        <p>
            Aqui você encontra tudo o que precisa para sua visão e estilo: óculos de sol, óculos de grau, lentes com e sem grau e lentes de contato.
        </p>

        <section>
            <h2>Resumo do Nosso Catálogo</h2>
            <ul>
                <li>
                    <FaGlasses /> <strong>Total de produtos:</strong> {totalProdutos}
                </li>
                <li>
                    <FaCheckCircle /> <strong>Disponíveis em loja:</strong> {" "} {disponiveis}
                </li>
                <li>
                    <FaGlasses /> <strong>Óculos (Sol e Grau):</strong> {oculos}
                </li>
                <li>
                    <FaEye /> <strong>Lentes (Com grau, sem grau e contato):</strong> {" "} {lentes}
                </li>
            </ul>
        </section>

        <Link to="/produtos">
            <button>Explorar Catálogo e Gerenciar Produtos</button>
        </Link>
    </div>
  );
}

export default Home;