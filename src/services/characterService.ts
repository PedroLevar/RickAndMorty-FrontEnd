import api from "./api";

export const getCharacters = async (searchTerm: string, page: number = 1) => {
    const encodedTerm = encodeURIComponent(searchTerm);
    const response = await api.get(`/character/?search=${encodedTerm}&page=${page}`);
    return response.data;
};
