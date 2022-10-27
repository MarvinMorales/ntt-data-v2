import React from "react";
import "../styles/PokemonCard.css";

export default function PokemonCard({ 
   color, 
   pokemonImage, 
   pokemonIndex, 
   pokemonName,
   handleClick
}) {
   return (
      <div className="cardContainer" onClick={handleClick} style={{backgroundColor: color}}>
         <div className="imageContainer">
            <img className="image" src={pokemonImage} alt="imagePokemon"/>
         </div>
         <h3 className="numberId"># {pokemonIndex}</h3>
         <p className="pokemonName">{pokemonName}</p>
      </div>
   );
}