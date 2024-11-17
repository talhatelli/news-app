import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getCountries = async () => {
  const response = await apiClient.get("/all");
  return response.data.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
};

const newsApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: {
    apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
  },
});

export const getNews = async ({ category, country, query }) => {
  const response = await newsApiClient.get("/top-headlines", {
    params: {
      category,
      country,
      q: query,
    },
  });
  return response.data.articles;
};
