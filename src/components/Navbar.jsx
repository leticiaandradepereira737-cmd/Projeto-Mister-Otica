import { Link } from "react-router-dom";
import { FaGlasses, FaHome, FaList } from "react-icons/fa";

function Navbar() {
  return (
    <header>
        <nav>
            <div>
                <FaGlasses /> <strong>Mister Ótica</strong>
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <FaHome /> Início
                    </Link>
                </li>
                <li>
                    <Link to="/produtos">
                        <FaList /> Catálogo de Produtos
                    </Link>
                </li>
            </ul>
        </nav>
        <hr />
    </header>
  );
}

export default Navbar;