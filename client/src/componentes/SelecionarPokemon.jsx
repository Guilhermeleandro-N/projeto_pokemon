import { useEffect, useState } from "react";
import "./SelecionarPokemon.css"
import PokemonDestaque from "./PokemonDestaque";
function SelecionarPokemon() {

    const [pokemons, setPokemons] = useState([]);
    const [busca, setBusca] = useState("");
    const [destaque, setDestaque]= useState()

    async function carregarPokemons() {

        let url = "http://localhost:3000/";

        if (busca) {
            url += `?nome=${busca}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setPokemons(data);
    }

    useEffect(() => {
        carregarPokemons();
    }, [busca]);

    return (
        <div  className="bigger-container">
            
        <div className="pokedex-container"  >
            
            <div className="header-container" >
            <h1>Pokédex</h1>
            
                <div>
                    <input className="inputClass"
                        type="text"
                        placeholder="Digite o nome do Pokémon"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>
                <ul>
                    {
                        pokemons.length === 0 ? (
                            <li>Nenhum Pokémon encontrado</li>
                        ) : (
                            pokemons.map((pokemon) => (
                                <li onClick={()=> setDestaque(pokemon)} key={pokemon.id} className="pokemon-item">
                                    <div className="image-container" >
                                        <img className="pok-img"
                                            src={pokemon.imagem}
                                            alt={pokemon.nome}

                                        />
                                    </div>
                                    <div className="pokemon-info">
                                        <span className="pokedex-number">#{pokemon.numero_pokedex}</span>
                                        <h2>{pokemon.nome}</h2>
                                        <div className="types-container">
                                            <span className="type-badge">{pokemon.tipo}</span>
                                            {/* Se você tiver uma lista de tipos, pode fazer um .map aqui */}
                                        </div>
                                    </div>
                                </li>
                            ))
                        )
                    }
                </ul>
                
        </div>
        <PokemonDestaque trigger={destaque} ></PokemonDestaque>
    </div>    
    );
}

export default SelecionarPokemon;
