import React from 'react'
import {useState} from "react"
import "./Cadastrar.css"
import {useNavigate} from "react-router-dom";
const Cadastrar = () => {
    const [form, setForm] = useState({
        nome: "",
        senha: "",
        sexo: "",
        pokemon_favorito: "",
        regiao: ""
    });
    
    const [message, setMessage] = useState("");
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/treinador/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok){
                setMessage("Treinador cadastrado com sucessor");
                setForm({
                    nome: "",
                    senha: "",
                    sexo: "",
                    pokemon_favorito: "",
                    regiao: ""
                });
                navigate("/login");
                
            } else {
                setMessage(data.message || "Erro ao cadastrar.");
            }
        } catch (error){
            setMessage("Erro ao conectar com o servidor.");
        }

    }
    function handleChange(e){
        setForm({  
            ...form,
            [e.target.name]: e.target.value
    });
    }
    return (
    
        <div className="register-wrapper">
            <div className='register-container'>
            <h2>Registre-se</h2>
            <form onSubmit={handleSubmit} >
                <input 
                type="text" 
                name="nome"
                placeholder="Nome"
                onChange={handleChange}
                required
                />
                <input 
                type="password"
                name="senha"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                required
                />
                <select 
                name="sexo"
                value={form.sexo}
                onChange={handleChange}
                required>
                    <option value="">Selecione o sexo</option>
                    <option value="menino">menino</option>
                    <option value="menina">menina</option>
                </select>
                <input 
                type="text"
                name="pokemon_favorito"
                placeholder="Pokémon favorito"
                value={form.pokemon_favorito}
                onChange={handleChange}
                required 
                />
                <input 
                type="text"
                name="regiao"
                placeholder="Região"
                value={form.regiao}
                onChange={handleChange}
                required
                />
                {message && <p className='form-error' >{message}</p>}
                <button type="submit">Cadastrar</button>
            </form>
            <a className='link-login' onClick={()=>{navigate("/login")}} >Já possui uma conta? Faça login</a>
            </div>
            
        </div>
  )
}

export default Cadastrar