const Sobre = () => {
    return (
        <main>
            <h1>Sobre o projeto</h1>

            <p className="texto-sobre">
                Esse projeto foi feito por <span className="dev">Gabriel Florindo</span>, dev junior que está se formando no Senai. Fiz esse projeto como uma alternativa
                direta para substituir o firebase database do google, já que essa foi a principal alternativa para fazer uma espécie de "back-end"
                que infelizmente eu não achei tão viável assim em projetos futuros pelo motivo de ter que pagar uma taxa pelo banco de dados
                além da hospedagem. Portanto, siga com as informações do projeto:<br /><br />

                <span className="destaque">Back-end:</span><br />
                O back-end desse site foi feito utilizando o nodeJS como servidor back-end e o MySql como banco de dados. Basicamente o 
                servidor back-end cria as query's (consultas para o banco), tratando os dados e as mensagens de erro, e logo em seguida envia 
                as informações para o banco, tudo isso usando o axios (biblioteca do npm) para fazer essa comunicação. <br /><br />

                <span className="destaque">Front-end:</span><br />
                O front-end é feito usando o React-vite, uma alternativa ao React que eu acho mais viável pela performance, já que é 
                visivelmente mais leve que o React padrão. Aqui eu usei também o react-router-dom (biblioteca npm) para preparar as rotas do 
                site, como a página de home, add usuário ou edit usuário, tudo de uma forma projegina na url da página. Além disso utilizei a 
                componentização para facilitar o desenvolvimento web.
            </p>
        </main>
    );
}

export default Sobre;