import React from "react";
import { Link } from 'react-router-dom';

// página de erro, carrega quando a url é inválida, tipo o erro 404
const Error_page = () => {
    return (
        <main>
            <h1>Erro 404: Página não encontrada</h1>

            <Link to={'/'} className="link-home">Voltar para a página inicial</Link>
        </main>
    )
}

export default Error_page;