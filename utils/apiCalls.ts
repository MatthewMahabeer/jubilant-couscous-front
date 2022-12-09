import { Brand } from "./types/inventory";
import { endpoint } from "./endpoint";
import axios from "axios";

export const getBrands = async (): Promise<Brand[]> => {
    const response = await fetch(`${endpoint}/brands/get`);
    return response.json();
}


// create brand function using axios
export const createBrand = async (name: string) => {
    const response = await axios.post(`${endpoint}/brands/create`, {name: name});
    return response.data;
}