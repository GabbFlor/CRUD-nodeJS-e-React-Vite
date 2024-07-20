import React from "react"
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <section className="header-logo">
                <Link to={'/'}>Home</Link>
            </section>

            <section className="header-search">
                <form action="">
                    <input type="text" placeholder="Pesquisar" />

                    <button><i className="bi bi-search"></i></button>
                </form>
            </section>

            <nav className="header-nav-bar">
                <ul>
                    <li><Link to={'/add-user'}>Adicionar usuário</Link></li>
                    <li><Link to={'/sobre'}>Sobre</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;