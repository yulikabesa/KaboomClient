import api from "./axios";

export const searchData = async (
  searchFor: string,
  searchTerm: string,
  signal?: AbortSignal,
) => {
  const response = await api.get(`/${searchFor}/search`, {
    params: { q: searchTerm },
    signal,
  });

  return response.data;
};
