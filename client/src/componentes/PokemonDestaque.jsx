import { useState } from "react";
import "./PokemonDestaque.css"
function PokemonDestaque({ trigger }) {
    return (trigger) ? (

        <div className="destaque-container">
            <div className="image-destaque" >
                <img className="pok-imgDes"
                    src={trigger.imagem}
                    alt={trigger.nome}

                />
            </div>
            <div className="pokemon-infoDes">
                <span className="pokedex-number">#{trigger.numero_pokedex}</span>
                <h2>{trigger.nome}</h2>
                <div className="types-containerDes">
                    <span className="type-badge">{trigger.tipo}</span>
                    {/* Se você tiver uma lista de tipos, pode fazer um .map aqui */}
                </div>
            </div>
        </div>



    ) : "";
}
export default PokemonDestaque;