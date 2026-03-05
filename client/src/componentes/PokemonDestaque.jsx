import { useEffect, useState } from "react";
import "./PokemonDestaque.css"
function PokemonDestaque({ trigger }) {

    const [pokemon, setPokemon] = useState(null)

    async function carregarPokemon() {
        const response = await fetch("http://localhost:3000/4");
        const data = await response.json();
        setPokemon(data);
    }

    useEffect(() => {
        if (!trigger){
            carregarPokemon()
            trigger = pokemon;
        }else {
            setPokemon(trigger)
        }
    }, [])

    return (pokemon) ? (

        <div className="destaque-container">
            <div className="image-destaque" >
                <img className="pok-imgDes"
                    src={pokemon.imagem}
                    alt={pokemon.nome}

                />
            </div>
            <div className="pokemon-infoDes">
                <span className="pokedex-number">#{pokemon.numero_pokedex}</span>
                <h2>{pokemon.nome}</h2>
                <div className="types-containerDes">
                    <span className="type-badge">{pokemon.tipo}</span>
                </div>
            </div>
        </div>

    ) : "";
}
export default PokemonDestaque;