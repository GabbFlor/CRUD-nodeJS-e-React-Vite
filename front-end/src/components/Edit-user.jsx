import { Link, useParams } from "react-router-dom";
import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Edit_user = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const { uid } = useParams();

    // recupera os dados do usuário
    useEffect(() => {
        axios.get(`http://localhost:3001/users/${uid}`)
        .then(response => {
            // seta os inputs de "name" e "email" da página com os valores de name e email recuperados pelo uid da url
            setNewName(response.data.name);
            setNewEmail(response.data.email);
        })
        .catch(error => {
            // caso não encontre o uid no banco de dados, ele leva para uma página de erro
            window.location.href = "/error";
        })
    }, [uid]);


    // faz a requisição de "put" do axios para editar dados do banco de dados usando o servidor back-end
    const updateUser = (id) => {
        axios.put(`http://localhost:3001/users/${id}`, { name: newName, email: newEmail })
            .then(response => {
                // requisição foi bem sucedida
                if (response.status === 200) {
                    setUsers(users.map(user => user.id === id ? { ...user, newName, newEmail } : user));
                    
                    window.location.href = '/';
                }
            })
            .catch(error => {
                // requisição mal sucedida (tratamento de erros)
                if (error.response && error.response.status === 404) {
                    alert("Erro: Usuário não encontrado");
                } else if (error.response && error.response.status === 500) {
                    alert("Erro: Email de usuário já está sendo utilizado")
                } else {
                    alert(`Erro ao atualizar o usuário: ${error.message}`)
                }
            });
    };

    return (
        <main>
            <h1>Editar usuário</h1>

            <form action="" className="form-edit-user">
                <div className="div-input">
                    <label htmlFor="Name">Nome:</label>
                    <input type="text" placeholder='Name' value={newName} onChange={e => setNewName(e.target.value)} />
                </div>

                <div className="div-input">
                    <label htmlFor="Email">Email:</label>
                    <input type="email" placeholder='Email' value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                </div>
            </form>

            <div className="buttons-edit-user">
                <Link to={'/'} className="button-delete link-delete">Cancelar</Link>

                <button className="button-edit submit-edit" onClick={() => updateUser(uid)}>Atualizar</button>
            </div>
        </main>
    )
}

export default Edit_user;