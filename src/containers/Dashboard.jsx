import { useCallback, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import PokemonCard from "../components/PokemonCard";
import PokemonSelectedCard from "../components/PokemonSelectedCard";
import configuration from "../configuration/configuration.json";
import frontData from "../data/dashboard-data.json";
import { _getPokemonByPagination, _getPokemonByName } from "../services/pokemonService";
import "../styles/Dashboard.css";

export default function Dashboard() {
   const { 
      title, 
      colors, 
      backButton, 
      nextButton, 
      inputPlaceHolder, 
      inputName,
   } = frontData;

   const { imagesRoute } = configuration;
   const offsetNum = 4;
   const [pokeList, setPokeList] = useState([]);
   const [pokemonSelected, setPokemonSelected] = useState(null);
   const [pagination, setPagination] = useState({ limit: 4, offset: 0 });
   const [textState, setTextState] = useState({name: ""});

   const fetchData = useCallback((lim, off) => {
      _getPokemonByPagination(lim, off)
      .then(({ data }) => {
         setPokeList(data?.results);
      }).catch((err) => console.error(err));
   }, [setPokeList]);

   const handleTextChange = useCallback(({ target }) => {
      const { name, value } = target;
      setTextState({...textState, [name]: value});
   }, [textState, setTextState]);

   const handleSelect = useCallback((name, index, image) => {
      _getPokemonByName(name)
      .then(({ data }) => {
         setPokemonSelected({
            name, index, image,
            sprites: data?.sprites,
            weight: data?.weight,
            type: data?.types?.type?.name,
         });
      }).catch((err) => console.error(err));
   }, []);

   const handlePrev = useCallback(() => {
      const { limit, offset } = pagination;
      console.log(offset)
      fetchData(limit, offset - offsetNum);
      setPagination({...pagination, offset: offset});
   }, [pagination, fetchData]);

   const handleNext = useCallback(() => {
      const { limit, offset } = pagination;
      fetchData(limit, offset);
      setPagination({...pagination, offset: offset + offsetNum});
   }, [pagination, fetchData]);

   const handleSubmit = useCallback((e) => {
      e.preventDefault();
      const { name } = textState;
      _getPokemonByName(name).then(({ data }) => {
         const { location_area_encounters } = data;
         const index = location_area_encounters.split("/").slice(-2)[0];
         const image = imagesRoute.replace("{index}", index);
         setPokemonSelected({
            name, index, image,
            sprites: data?.sprites,
            weight: data.weight,
            type: data?.types[0].type?.name
         });
      }).catch((err) => console.error(err));
   }, [imagesRoute, textState]);

   useEffect(() => {
      const { limit, offset } = pagination;
      fetchData(limit, offset);
      setPagination({...pagination, offset: offset + offsetNum});
   }, []);

   return (
      <div className="container">
         <div className="title-col">
            <h3 className="title">{title}</h3>
         </div>
         <form onSubmit={handleSubmit} className="search-col">
            <div className="serchContainer">
               <input 
                  name={inputName}
                  type="search" 
                  value={textState?.name}
                  onChange={handleTextChange} 
                  className="inputSearch" 
                  placeholder={inputPlaceHolder}
               />
              
            </div>
         </form>
         <div className="cards-col">
            <div className="itemsSection">
               {pokeList?.map((item, index) => {
                     const pokeIndex = item?.url.split("/").slice(-2)[0];
                     const pokeImage = imagesRoute.replace("{index}", pokeIndex);
                     return (
                        <PokemonCard 
                           key={index}
                           // onClick={handleSelect(item?.name, pokeIndex, pokeImage)}
                           pokemonImage={pokeImage} 
                           pokemonIndex={pokeIndex} 
                           pokemonName={item?.name} 
                           color={colors[index]}
                        />
                     );
                  })}
            </div>
            <div className="selectedContainer">
               {pokemonSelected !== null && (
                  <PokemonSelectedCard 
                     pokemonSprites={pokemonSelected?.sprites}
                     pokemonId={pokemonSelected?.index} 
                     pokemonImage={pokemonSelected?.image} 
                     pokemonName={pokemonSelected?.name} 
                     pokemonType={pokemonSelected?.type} 
                     pokemonWeigth={pokemonSelected?.weight}
                  />
               )}
            </div>
         </div>
         <div className="buttons-col">
            <button 
               type="button" 
               onClick={handlePrev}
               className="buttons"
               disabled={pagination?.offset === offsetNum} 
            >
               <FiChevronLeft className="icons l"/>
               {backButton}
            </button>
            <button 
               type="button" 
               onClick={handleNext}
               className="buttons"
            >
               {nextButton}
               <FiChevronRight className="icons r"/>
            </button>
         </div>
      </div>
   );
}