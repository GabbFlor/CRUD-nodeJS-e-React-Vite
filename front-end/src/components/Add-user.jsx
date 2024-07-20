import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css'
import { Link } from 'react-router-dom';

const Add_user = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = () => {
    // verifica se email e nome estão preenchidos
    if (name == "" || email == "") {
      alert("Preencha todos os campos")
    } else {
      // faz a requisição de "post" usando o axios para o servidor back-end
      axios.post('http://localhost:3001/users', { name: name, email: email })
      .then(response => {
        // aqui é se a resposta for positiva, ou se a requisição teve sucesso ao enviar ao banco
        if (response.status === 200) {
          window.location.href = "/"
        }
      })
      .catch(error => {
        // aqui são os erros possíveis, todos enviados pelo back-end e interpretados aqui
        if (error.response && error.response.status === 409) {
          alert("Erro: Esse email de usuário já está sendo utilizado");
        } else if (error.response && error.response.status === 500) {
          alert("Erro no banco de dados")
        } else {
          alert(`Erro ao atualizar o usuário: ${error.message}`)
        }
      });
    }
  }

  

  return (
    <main>
      <h1>Adicionar usuário
      </h1>

      <form action="" className='form-edit-user'>
        <div className='div-input'>
          <label htmlFor="name">Nome:</label>
          <input type="text" placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className='div-input'>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </form>
      <button className="button-edit submit-edit" onClick={addUser}>Adicionar</button>

      
    </main>
  );
};

export default Add_user;