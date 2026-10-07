import api from "./axios";

export const searchData = async (
  searchFor: string,
  searchTerm: string,
  signal?: AbortSignal,
  excludeIds?: string[],
) => {
  const response = await api.get(`/${searchFor}/search`, {
    params: {
      q: searchTerm,
      // ids the caller already has, so they wont show up in the results
      ...(excludeIds?.length ? { exclude: excludeIds.join(",") } : {}),
    },
    signal,
  });

  return response.data;
};
