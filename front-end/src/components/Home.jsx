import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);

    // useEffect faz com que seja padrão executar essa função quando a página for recarregada
    useEffect(() => {
        // envia a requisição "get" para o back-end
        axios.get('http://localhost:3001/users')
        // armazena o "response" informações coletadas pelo .get no "Users" com o "setUsers"
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
      }, []);

      const deleteUser = (id) => {
        // serve para funcionar o alerta de confirmação de delete
        const isConfirmed =  window.confirm("Tem certeza que deseja deletar esse usuário?");
    
    if (isConfirmed) {
          axios.delete(`http://localhost:3001/users/${id}`)
          .then(response => setUsers(users.filter(user => user.id !== id)))
          .catch(error => console.error(error));
        }
    }

    return (
        <main>
            <h1>Usuários</h1>

            <table className='tabela-users'>
                <thead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Ação</th>
                </tr>
                </thead>

                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='div-buttons'>
                        <button className='button-delete' onClick={() => deleteUser(user.id)}>Delete</button>
                        <Link className='button-edit' to={`/edit-user/${user.id}`}>Editar</Link>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    )
}

export default Home;