import React from "react";

export default function PokemonSelectedCard({
   pokemonImage,
   pokemonSprites,
   pokemonId,
   pokemonName,
   pokemonType,
   pokemonWeigth,
}) {
   return (
      <div className="selectedPokemon">
         <div className="selectedImageContainer">
            <img className="selectedImg" src={pokemonImage} alt="imagePokemon"/>
         </div>
         <h3 className="numberId"># {pokemonId}</h3>
         <p className="pokemonName">{pokemonName}</p>
         <h4 className="titles-items">Types</h4>
         <p>{pokemonType}</p>
         <h4 className="titles-items">Peso</h4>
         <p>{pokemonWeigth}</p>
         <h4 className="titles-items">Sprites</h4>
         <div className="spritesCont">
            {Object.keys(pokemonSprites).map((elem, index) => (
               typeof pokemonSprites[elem] === "string" && (
                  <div key={index} className="sprites">
                     <img 
                        src={typeof pokemonSprites[elem] === "string" && pokemonSprites[elem]} 
                        className="spriteImg" 
                        alt="sprites"
                     />
                  </div>
               )
            ))}
         </div>
         <h4 className="titles-items">Movimientos</h4>
         <p>{pokemonWeigth}</p>
      </div>
   );
}