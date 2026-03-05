import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css"
function Login(){
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/treinador/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nome, senha})
            });
            const data = await response.json();

            if (response.ok){
                localStorage.setItem("treinador", JSON.stringify(data));
                navigate("/");
            }else{
                setMessage(data.message || "Nome ou senha inválidos.");
            }
        }catch (error){
            setMessage("Erro ao conectar com o servidor");
        }
    }
    return (
        <div className="login-wrapper" >
            <div className="login-container" >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e)=>setNome(e.target.value)}
                    required 
                    />
                    <input 
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e)=>setSenha(e.target.value)}
                    required
                    />
                    {message && <p className="form-error" >{message}</p>}
                    <button type="submit">Entrar</button>
                    
                </form>
                <a className="link-register" onClick={()=>{navigate("/cadastrar")}} >Não possui uma conta? Registre-se</a>
            </div>
            
            
        </div>
    );
}

export default Login;