import { useEffect, useState } from "react";
import Masculino from "../assets/Masculino.png";
import Feminino from "../assets/Feminino.png";
import "./CardTreinador.css"
function CardTreinador() {

    const [treinador, setTreinador] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem("treinador");

        if (data) {
            setTreinador(JSON.parse(data));
        }
    }, []);

    if (!treinador) {
        return <p>Nenhum treinador logado</p>;
    }

    const imagem = treinador.sexo === "menino" ? Masculino : Feminino;
    const sexo = treinador.sexo == "menino" ? "Masculino" : "Feminino"
    return (
        <div className="trainer-card">

            <img
                src={imagem}
                alt="Treinador"
                className="trainer-img"
            />

            <h2>{treinador.nome}</h2>

            <p><strong>Sexo:</strong> {sexo}</p>

            <p><strong>Região:</strong> {treinador.regiao}</p>

            <p><strong>Pokémon favorito:</strong> {treinador.pokemon_favorito}</p>

        </div>
    );
}

export default CardTreinador;