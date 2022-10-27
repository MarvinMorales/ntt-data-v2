import axios from "axios";
import configuration from "../configuration/configuration.json";

const { apiService, endpoints } = configuration;
const { getPokemonByName, getPokemonByPagination, getPokemonList } = endpoints;

export const _getPokemonByName = async (name) => {
   const data = getPokemonByName.replace("{name}", name);
   return axios.get(apiService + data);
}

export const _getPokemonByPagination = async (limit, offset) => {
   const _limit = getPokemonByPagination.replace("{limit}", limit);
   const data = _limit.replace("{offset}", offset);
   return axios.get(apiService + data);
}

export const _getPokemonByList = async () => 
   axios.get(apiService + getPokemonList);